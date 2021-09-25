"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnorableError = exports.BuildError = void 0;
var BuildError = /** @class */ (function (_super) {
    __extends(BuildError, _super);
    function BuildError(error) {
        var _this = _super.call(this, error instanceof Error ? error.message : error) || this;
        _this.hasBeenLogged = false;
        _this.isFatal = false;
        if (error instanceof Error) {
            _this.message = error.message;
            _this.stack = error.stack;
            _this.name = error.name;
            _this.hasBeenLogged = error.hasBeenLogged;
            _this.isFatal = error.isFatal;
        }
        return _this;
    }
    return BuildError;
}(Error));
exports.BuildError = BuildError;
/* There are special cases where strange things happen where we don't want any logging, etc.
 * For our sake, it is much easier to get off the happy path of code and just throw an exception
 * and do nothing with it
 */
var IgnorableError = /** @class */ (function (_super) {
    __extends(IgnorableError, _super);
    function IgnorableError(msg) {
        return _super.call(this, msg) || this;
    }
    return IgnorableError;
}(Error));
exports.IgnorableError = IgnorableError;
