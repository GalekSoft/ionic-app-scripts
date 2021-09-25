"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSystemCompilerHostInstance = void 0;
var compiler_host_1 = require("./compiler-host");
var hybrid_file_system_factory_1 = require("../util/hybrid-file-system-factory");
var instance = null;
function getFileSystemCompilerHostInstance(options) {
    if (!instance) {
        instance = new compiler_host_1.FileSystemCompilerHost(options, (0, hybrid_file_system_factory_1.getInstance)(false));
    }
    return instance;
}
exports.getFileSystemCompilerHostInstance = getFileSystemCompilerHostInstance;
