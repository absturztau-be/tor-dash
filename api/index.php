<?php

require_once("../vendor/autoload.php");

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Dapphp\TorUtils\ControlClient;

$configFile = "";
$configPlaces = [
	"./tor-dash.conf",
	"/etc/tor/tor-dash.conf"
];

foreach ($configPlaces as $place) {
	if (file_exists($place)) {
		$configFile = $place;
	}
}

if (empty($configFile)) {
	throw new Exception("no config");
}

$configContent = file_get_contents($configFile);

$config = [
	"Host" => "127.0.0.1",
	"Port" => "9051",
	"Pass" => null
];

$lines = explode("\n", $configContent);
foreach ($lines as $line) {
	if (!empty($line) && !preg_match("/^#/", $line)) {
		list ($key, $value) = explode(" ", $line);
		$config[$key] = $value;
	}
}

$app = AppFactory::create();
$app->setBasePath("/api");

$app->get("/desc", function (Request $request, Response $response, array $args) use ($config) {
	$result = [
		"nickname" => null,
		"fingerprint" => null,
		"flags" => [],
		"exitPolicy" => null,
		"bandwidth" => [
			"observed" => null,
			"average" => null
		]
	];

	try {
		$tc = new ControlClient();
		$tc->connect($config["Host"], $config["Port"]);
		$tc->authenticate($config["Pass"]);
		$fingerprint = $tc->getInfoFingerprint();

		$desc = $tc->getInfoDescriptor($fingerprint);
		$stat = $tc->getInfoDirectoryStatus($fingerprint);

		$result["fingerprint"] = $fingerprint;
		$result["nickname"] = $desc->nickname;
		$result["flags"] = $stat->flags;
		$result["exitPolicy"] = [
			"ipv4" => $stat->exit_policy4,
			"ipv6" => $stat->exit_policy6
		];
		$result["bandwidth"] = [
			"all" => $stat->bandwidth,
			"average" => $desc->bandwidth_average,
			"burst" => $desc->bandwidth_burst,
			"observed" => $desc->bandwidth_observed
		];
	} catch (\Exception $ex) {
		error_log($ex->getMessage());
		error_log($ex->getFile());
		error_log($ex->getLine());
		$response->withStatus(500)->getBody()->write(json_encode([
			"reason" => $ex->getMessage()
		]));
		return $response;
	}

	$response->getBody()->write(json_encode($result));
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/version", function (Request $request, Response $response, array $args) use ($config) {
	$result = [
		"version" => null,
		"current" => null,
		"recommended" => null
	];

	try {
		$tc = new ControlClient();
		$tc->connect($config["Host"], $config["Port"]);
		$tc->authenticate($config["Pass"]);
		$result = [
			"version" => $tc->getVersion(),
			"current" => $tc->getInfoStatusVersionCurrent(),
			"recommended" => $tc->getInfoStatusVersionRecommended()
		];
	} catch (\Exception $ex) {
		error_log($ex->getMessage());
		error_log($ex->getFile());
		error_log($ex->getLine());
		$response->withStatus(500)->getBody()->write(json_encode([
			"reason" => $ex->getMessage()
		]));
		return $response;
	}
	$response->getBody()->write(json_encode($result));
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/uptime", function (Request $request, Response $response, array $args) use ($config) {
	$result = [
		"uptime" => null
	];

	try {
		$tc = new ControlClient();
		$tc->connect($config["Host"], $config["Port"]);
		$tc->authenticate($config["Pass"]);
		$result["uptime"] = intval((string)$tc->getInfo(ControlClient::GETINFO_UPTIME));
	} catch (\Exception $ex) {
		error_log($ex->getMessage());
		error_log($ex->getFile());
		error_log($ex->getLine());
		$response->withStatus(500)->getBody()->write(json_encode([
			"reason" => $ex->getMessage()
		]));

		return $response;
	}

	$response->getBody()->write(json_encode($result));
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/traffic", function (Request $request, Response $response, array $args) use ($config) {
	$result = [
		"read" => null,
		"written" => null,
		"timestamp" => microtime(true)
	];

	try {
		$tc = new ControlClient();
		$tc->connect($config["Host"], $config["Port"]);
		$tc->authenticate($config["Pass"]);
		$result["read"] = intval($tc->getInfoTrafficRead());
		$result["written"] = intval($tc->getInfoTrafficWritten());
		$result["timestamp"] = microtime(true);
	} catch (\Exception $ex) {
		error_log($ex->getMessage());
		error_log($ex->getFile());
		error_log($ex->getLine());
		$response->getBody()->write(json_encode([
			"reason" => $ex->getMessage()
		]));
		return $response->withStatus(500)->withHeader("Content-Type", "application/json");
	}

	$response->getBody()->write(json_encode($result));
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/orconn", function (Request $request, Response $response, array $args) use ($config) {
	$result = [
		"total" => 0,
		"detail" => []
	];

	try {
		$tc = new ControlClient();
		$tc->connect($config["Host"], $config["Port"]);
		$tc->authenticate($config["Pass"]);
		$conns = explode("\n", $tc->getInfo("orconn-status"));
		$result["total"] = count($conns);
		foreach ($conns as $conn) {
			list ($host, $state) = explode(" ", $conn);
			if (!isset($result["detail"][$state])) {
				$result["detail"][$state] = 0;
			}
			$result["detail"][$state]++;
		}
	} catch (\Exception $ex) {
		error_log($ex->getMessage());
		error_log($ex->getFile());
		error_log($ex->getLine());
		$response->getBody()->write(json_encode([
			"reason" => $ex->getMessage()
		]));
		return $response->withStatus(500)->withHeader("Content-Type", "application/json");
	}

	$response->getBody()->write(json_encode($result));
	return $response->withHeader("Content-Type", "application/json");
});

$app->run();