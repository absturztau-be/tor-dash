const VERSION = "/api/version";
const TRAFFIC = "/api/traffic";
const ORCONN = "/api/orconn";
const DESC = "/api/desc";
const UPTIME = "/api/uptime";

const apiService = {
    getVersion: () => {
        return new Promise((resolve, reject) => {
            window.fetch(VERSION).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getTraffic: () => {
        return new Promise((resolve, reject) => {
            window.fetch(TRAFFIC).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getOrConn: () => {
        return new Promise((resolve, reject) => {
            window.fetch(ORCONN).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getDesc: () => {
        return new Promise((resolve, reject) => {
            window.fetch(DESC).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getUptime: () => {
        return new Promise((resolve, reject) => {
            window.fetch(UPTIME).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    }
};

export default apiService;