"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheLoader = void 0;
var path_1 = require("path");
var Constants = require("../util/constants");
var helpers_1 = require("../util/helpers");
function cacheLoader(source, map, webpackContex) {
    webpackContex.cacheable();
    var callback = webpackContex.async();
    try {
        var context = (0, helpers_1.getContext)();
        if ((0, helpers_1.getBooleanPropertyValue)(Constants.ENV_AOT_WRITE_TO_DISK)) {
            var jsPath = (0, helpers_1.changeExtension)((0, path_1.resolve)((0, path_1.normalize)(webpackContex.resourcePath)), '.js');
            var newSourceFile = { path: jsPath, content: source };
            context.fileCache.set(jsPath, newSourceFile);
            var mapPath = (0, helpers_1.changeExtension)(jsPath, '.js.map');
            var newMapFile = { path: mapPath, content: JSON.stringify(map) };
            context.fileCache.set(mapPath, newMapFile);
        }
        callback(null, source, map);
    }
    catch (ex) {
        callback(ex);
    }
}
exports.cacheLoader = cacheLoader;
