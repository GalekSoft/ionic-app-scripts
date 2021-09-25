"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonChunksPlugin = exports.getSourceMapperFunction = exports.getIonicEnvironmentPlugin = void 0;
var common_chunks_plugins_1 = require("./common-chunks-plugins");
Object.defineProperty(exports, "getCommonChunksPlugin", { enumerable: true, get: function () { return common_chunks_plugins_1.getCommonChunksPlugin; } });
var ionic_environment_plugin_1 = require("./ionic-environment-plugin");
var source_mapper_1 = require("./source-mapper");
var helpers_1 = require("../util/helpers");
function getIonicEnvironmentPlugin() {
    var context = (0, helpers_1.getContext)();
    return new ionic_environment_plugin_1.IonicEnvironmentPlugin(context, true);
}
exports.getIonicEnvironmentPlugin = getIonicEnvironmentPlugin;
function getSourceMapperFunction() {
    return source_mapper_1.provideCorrectSourcePath;
}
exports.getSourceMapperFunction = getSourceMapperFunction;
