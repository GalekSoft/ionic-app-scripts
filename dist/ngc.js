"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTsForDeepLinking = exports.runNgc = exports.ngcWorker = exports.ngc = void 0;
var aot_compiler_1 = require("./aot/aot-compiler");
var util_1 = require("./deep-linking/util");
var logger_1 = require("./logger/logger");
var config_1 = require("./util/config");
var Constants = require("./util/constants");
var helpers_1 = require("./util/helpers");
function ngc(context, configFile) {
    configFile = (0, config_1.getUserConfigFile)(context, taskInfo, configFile);
    var logger = new logger_1.Logger('ngc');
    return ngcWorker(context, configFile)
        .then(function () {
        logger.finish();
    })
        .catch(function (err) {
        throw logger.fail(err);
    });
}
exports.ngc = ngc;
function ngcWorker(context, configFile) {
    return transformTsForDeepLinking(context).then(function () {
        return runNgc(context, configFile);
    });
}
exports.ngcWorker = ngcWorker;
function runNgc(context, configFile) {
    return (0, aot_compiler_1.runAot)(context, { entryPoint: process.env[Constants.ENV_APP_ENTRY_POINT],
        rootDir: context.rootDir,
        tsConfigPath: process.env[Constants.ENV_TS_CONFIG],
        appNgModuleClass: process.env[Constants.ENV_APP_NG_MODULE_CLASS],
        appNgModulePath: process.env[Constants.ENV_APP_NG_MODULE_PATH]
    });
}
exports.runNgc = runNgc;
function transformTsForDeepLinking(context) {
    if ((0, helpers_1.getBooleanPropertyValue)(Constants.ENV_PARSE_DEEPLINKS)) {
        var tsFiles = (0, util_1.filterTypescriptFilesForDeepLinks)(context.fileCache);
        tsFiles.forEach(function (tsFile) {
            tsFile.content = (0, util_1.purgeDeepLinkDecorator)(tsFile.content);
        });
        var tsFile = context.fileCache.get((0, helpers_1.getStringPropertyValue)(Constants.ENV_APP_NG_MODULE_PATH));
        if (!(0, util_1.hasExistingDeepLinkConfig)(tsFile.path, tsFile.content)) {
            var deepLinkString = (0, util_1.convertDeepLinkConfigEntriesToString)((0, helpers_1.getParsedDeepLinkConfig)());
            tsFile.content = (0, util_1.getUpdatedAppNgModuleContentWithDeepLinkConfig)(tsFile.path, tsFile.content, deepLinkString);
        }
    }
    return Promise.resolve();
}
exports.transformTsForDeepLinking = transformTsForDeepLinking;
var taskInfo = {
    fullArg: '--ngc',
    shortArg: '-n',
    envVar: 'IONIC_NGC',
    packageConfig: 'ionic_ngc',
    defaultConfigFile: null
};
