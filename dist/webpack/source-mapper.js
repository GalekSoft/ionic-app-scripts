"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCorrectSourcePath = void 0;
var helpers_1 = require("../util/helpers");
var path_1 = require("path");
var constants_1 = require("../util/constants");
function provideCorrectSourcePath(webpackObj) {
    var context = (0, helpers_1.getContext)();
    return provideCorrectSourcePathInternal(webpackObj, context);
}
exports.provideCorrectSourcePath = provideCorrectSourcePath;
function provideCorrectSourcePathInternal(webpackObj, context) {
    var webpackResourcePath = webpackObj.resourcePath;
    var noTilde = webpackResourcePath.replace(/~/g, 'node_modules');
    var absolutePath = (0, path_1.resolve)((0, path_1.normalize)(noTilde));
    if (process.env[constants_1.ENV_VAR_SOURCE_MAP_TYPE] === constants_1.SOURCE_MAP_TYPE_CHEAP) {
        var mapPath = path_1.sep + absolutePath;
        return (0, helpers_1.toUnixPath)(mapPath);
    }
    // does the full map
    var backPath = (0, path_1.relative)(context.buildDir, context.rootDir);
    var relativePath = (0, path_1.relative)(context.rootDir, absolutePath);
    var relativeToBuildDir = (0, path_1.join)(backPath, relativePath);
    return (0, helpers_1.toUnixPath)(relativeToBuildDir);
}
