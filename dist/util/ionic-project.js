"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectJson = void 0;
var path = require("path");
var fs = require("fs");
var promisify_1 = require("./promisify");
var readFilePromise = (0, promisify_1.promisify)(fs.readFile);
function getProjectJson() {
    var projectFile = path.join(process.cwd(), 'ionic.config.json');
    return readFilePromise(projectFile).then(function (textString) {
        return JSON.parse(textString.toString());
    });
}
exports.getProjectJson = getProjectJson;
