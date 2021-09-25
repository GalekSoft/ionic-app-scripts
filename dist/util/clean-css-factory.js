"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCleanCssInstance = void 0;
var cleanCss = require("clean-css");
function getCleanCssInstance(options) {
    return new cleanCss(options);
}
exports.getCleanCssInstance = getCleanCssInstance;
