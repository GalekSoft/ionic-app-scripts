"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonChunksPlugin = void 0;
var CommonChunksPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var Constants = require("../util/constants");
var helpers_1 = require("../util/helpers");
function getCommonChunksPlugin() {
    return new CommonChunksPlugin({
        name: 'vendor',
        minChunks: checkIfInNodeModules
    });
}
exports.getCommonChunksPlugin = getCommonChunksPlugin;
function checkIfInNodeModules(webpackModule) {
    return webpackModule && webpackModule.userRequest && webpackModule.userRequest.startsWith((0, helpers_1.getStringPropertyValue)(Constants.ENV_VAR_NODE_MODULES_DIR));
}
