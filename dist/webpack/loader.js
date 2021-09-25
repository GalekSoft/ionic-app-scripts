"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_impl_1 = require("./loader-impl");
module.exports = function loader(source, map) {
    (0, loader_impl_1.webpackLoader)(source, map, this);
};
