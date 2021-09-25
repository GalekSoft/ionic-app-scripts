"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskInfo = exports.runCleanCss = exports.cleancssWorker = exports.cleancss = void 0;
var path_1 = require("path");
var errors_1 = require("./util/errors");
var config_1 = require("./util/config");
var logger_1 = require("./logger/logger");
var helpers_1 = require("./util/helpers");
var workerClient = require("./worker-client");
var clean_css_factory_1 = require("./util/clean-css-factory");
function cleancss(context, configFile) {
    var logger = new logger_1.Logger('cleancss');
    configFile = (0, config_1.getUserConfigFile)(context, exports.taskInfo, configFile);
    return workerClient.runWorker('cleancss', 'cleancssWorker', context, configFile).then(function () {
        logger.finish();
    }).catch(function (err) {
        throw logger.fail(err);
    });
}
exports.cleancss = cleancss;
function cleancssWorker(context, configFile) {
    context = (0, config_1.generateContext)(context);
    var config = (0, config_1.fillConfigDefaults)(configFile, exports.taskInfo.defaultConfigFile);
    var srcFile = (0, path_1.join)(context.buildDir, config.sourceFileName);
    var destFilePath = (0, path_1.join)(context.buildDir, config.destFileName);
    logger_1.Logger.debug("[Clean CSS] cleancssWorker: reading source file " + srcFile);
    return (0, helpers_1.readFileAsync)(srcFile).then(function (fileContent) {
        return runCleanCss(config, fileContent);
    }).then(function (minifiedContent) {
        logger_1.Logger.debug("[Clean CSS] runCleanCss: writing file to disk " + destFilePath);
        return (0, helpers_1.writeFileAsync)(destFilePath, minifiedContent);
    });
}
exports.cleancssWorker = cleancssWorker;
// exporting for easier unit testing
function runCleanCss(cleanCssConfig, fileContent) {
    return new Promise(function (resolve, reject) {
        var minifier = (0, clean_css_factory_1.getCleanCssInstance)(cleanCssConfig.options);
        minifier.minify(fileContent, function (err, minified) {
            if (err) {
                reject(new errors_1.BuildError(err));
            }
            else if (minified.errors && minified.errors.length > 0) {
                // just return the first error for now I guess
                minified.errors.forEach(function (e) {
                    logger_1.Logger.error(e);
                });
                reject(new errors_1.BuildError(minified.errors[0]));
            }
            else {
                resolve(minified.styles);
            }
        });
    });
}
exports.runCleanCss = runCleanCss;
// export for testing only
exports.taskInfo = {
    fullArg: '--cleancss',
    shortArg: '-e',
    envVar: 'IONIC_CLEANCSS',
    packageConfig: 'ionic_cleancss',
    defaultConfigFile: 'cleancss.config'
};
