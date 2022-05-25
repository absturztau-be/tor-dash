require("shelljs/global");

env.NODE_ENV = "production";

const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("../config/webpack.config.js");

console.log("preparing build...");
rm("-rf", path.resolve(__dirname, "../dist"));
mkdir("-p", path.resolve(__dirname, "../dist/api"));

console.log("placing static assets...");
cp("-R", path.resolve(__dirname, "../static/*"), path.resolve(__dirname, "../dist/"));
cp("-R", path.resolve(__dirname, "../api/index.php"), path.resolve(__dirname, "../dist/api/"));

console.log("installing composer modules...");
exec("composer install");
cp("-R", path.resolve(__dirname, "../vendor"), path.resolve(__dirname, "../dist/vendor"));

console.log("building webapp...");
webpack(webpackConfig, function (err, stats) {
    console.log("all done");
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + "\n");
});