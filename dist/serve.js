"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationPort = exports.serve = void 0;
var config_1 = require("./util/config");
var helpers_1 = require("./util/helpers");
var logger_1 = require("./logger/logger");
var watch_1 = require("./watch");
var open_1 = require("./util/open");
var notification_server_1 = require("./dev-server/notification-server");
var http_server_1 = require("./dev-server/http-server");
var live_reload_1 = require("./dev-server/live-reload");
var serve_config_1 = require("./dev-server/serve-config");
var network_1 = require("./util/network");
var DEV_LOGGER_DEFAULT_PORT = 53703;
var LIVE_RELOAD_DEFAULT_PORT = 35729;
var DEV_SERVER_DEFAULT_PORT = 8100;
var DEV_SERVER_DEFAULT_HOST = '0.0.0.0';
function serve(context) {
    (0, helpers_1.setContext)(context);
    var config;
    var httpServer;
    var host = getHttpServerHost(context);
    var notificationPort = getNotificationPort(context);
    var liveReloadServerPort = getLiveReloadServerPort(context);
    var hostPort = getHttpServerPort(context);
    function finish() {
        if (config) {
            if (httpServer) {
                httpServer.listen(config.httpPort, config.host, function () {
                    logger_1.Logger.debug("listening on " + config.httpPort);
                });
            }
            onReady(config, context);
        }
    }
    return (0, network_1.findClosestOpenPorts)(host, [notificationPort, liveReloadServerPort, hostPort])
        .then(function (_a) {
        var notificationPortFound = _a[0], liveReloadServerPortFound = _a[1], hostPortFound = _a[2];
        var hostLocation = (host === '0.0.0.0') ? 'localhost' : host;
        config = {
            httpPort: hostPortFound,
            host: host,
            hostBaseUrl: "http://" + hostLocation + ":" + hostPortFound,
            rootDir: context.rootDir,
            wwwDir: context.wwwDir,
            buildDir: context.buildDir,
            isCordovaServe: isCordovaServe(context),
            launchBrowser: launchBrowser(context),
            launchLab: launchLab(context),
            browserToLaunch: browserToLaunch(context),
            useLiveReload: useLiveReload(context),
            liveReloadPort: liveReloadServerPortFound,
            notificationPort: notificationPortFound,
            useServerLogs: useServerLogs(context),
            useProxy: useProxy(context),
            notifyOnConsoleLog: sendClientConsoleLogs(context),
            devapp: false
        };
        (0, notification_server_1.createNotificationServer)(config);
        (0, live_reload_1.createLiveReloadServer)(config);
        httpServer = (0, http_server_1.createHttpServer)(config);
        return (0, watch_1.watch)(context);
    })
        .then(function () {
        finish();
        return config;
    }, function (err) {
        throw err;
    })
        .catch(function (err) {
        if (err && err.isFatal) {
            throw err;
        }
        else {
            finish();
            return config;
        }
    });
}
exports.serve = serve;
function onReady(config, context) {
    if (config.launchBrowser) {
        var openOptions = [config.hostBaseUrl]
            .concat(launchLab(context) ? [serve_config_1.IONIC_LAB_URL] : [])
            .concat(browserOption(context) ? [browserOption(context)] : [])
            .concat(platformOption(context) ? ['?ionicplatform=', platformOption(context)] : []);
        (0, open_1.default)(openOptions.join(''), browserToLaunch(context), function (error) {
            if (error) {
                var errorMessage = error && error.message ? error.message : error.toString();
                logger_1.Logger.warn("Failed to open the browser: " + errorMessage);
            }
        });
    }
    logger_1.Logger.info("dev server running: " + config.hostBaseUrl + "/", 'green', true);
    logger_1.Logger.newLine();
}
function getHttpServerPort(context) {
    var port = (0, config_1.getConfigValue)(context, '--port', '-p', 'IONIC_PORT', 'ionic_port', null);
    if (port) {
        return parseInt(port, 10);
    }
    return DEV_SERVER_DEFAULT_PORT;
}
function getHttpServerHost(context) {
    var host = (0, config_1.getConfigValue)(context, '--address', '-h', 'IONIC_ADDRESS', 'ionic_address', null);
    if (host) {
        return host;
    }
    return DEV_SERVER_DEFAULT_HOST;
}
function getLiveReloadServerPort(context) {
    var port = (0, config_1.getConfigValue)(context, '--livereload-port', null, 'IONIC_LIVERELOAD_PORT', 'ionic_livereload_port', null);
    if (port) {
        return parseInt(port, 10);
    }
    return LIVE_RELOAD_DEFAULT_PORT;
}
function getNotificationPort(context) {
    var port = (0, config_1.getConfigValue)(context, '--dev-logger-port', null, 'IONIC_DEV_LOGGER_PORT', 'ionic_dev_logger_port', null);
    if (port) {
        return parseInt(port, 10);
    }
    return DEV_LOGGER_DEFAULT_PORT;
}
exports.getNotificationPort = getNotificationPort;
function useServerLogs(context) {
    return (0, config_1.hasConfigValue)(context, '--serverlogs', '-s', 'ionic_serverlogs', false);
}
function isCordovaServe(context) {
    return (0, config_1.hasConfigValue)(context, '--iscordovaserve', '-z', 'ionic_cordova_serve', false);
}
function launchBrowser(context) {
    return !(0, config_1.hasConfigValue)(context, '--nobrowser', '-b', 'ionic_launch_browser', false);
}
function browserToLaunch(context) {
    return (0, config_1.getConfigValue)(context, '--browser', '-w', 'IONIC_BROWSER', 'ionic_browser', null);
}
function browserOption(context) {
    return (0, config_1.getConfigValue)(context, '--browseroption', '-o', 'IONIC_BROWSEROPTION', 'ionic_browseroption', null);
}
function launchLab(context) {
    return (0, config_1.hasConfigValue)(context, '--lab', '-l', 'ionic_lab', false);
}
function platformOption(context) {
    return (0, config_1.getConfigValue)(context, '--platform', '-t', 'IONIC_PLATFORM_BROWSER', 'ionic_platform_browser', null);
}
function useLiveReload(context) {
    return !(0, config_1.hasConfigValue)(context, '--nolivereload', '-d', 'ionic_livereload', false);
}
function useProxy(context) {
    return !(0, config_1.hasConfigValue)(context, '--noproxy', '-x', 'ionic_proxy', false);
}
function sendClientConsoleLogs(context) {
    return (0, config_1.hasConfigValue)(context, '--consolelogs', '-c', 'ionic_consolelogs', false);
}
