"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = void 0;
/**
 * @example: const rReadFile = promisify<Buffer, string>(fs.readFile);
 */
var promisify = function (func) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            func.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (err, response) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(response);
                }], false));
        });
    };
};
exports.promisify = promisify;
