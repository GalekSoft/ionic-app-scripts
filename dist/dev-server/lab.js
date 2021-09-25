"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPackageJson = exports.ApiCordovaProject = exports.LabAppView = void 0;
var path = require("path");
var cordova_config_1 = require("../util/cordova-config");
/**
 * Main Lab app view
 */
var LabAppView = function (req, res) {
    return res.sendFile('index.html', { root: path.join(__dirname, '..', '..', 'lab') });
};
exports.LabAppView = LabAppView;
var ApiCordovaProject = function (req, res) {
    (0, cordova_config_1.buildCordovaConfig)(function (err) {
        res.status(400).json({ status: 'error', message: 'Unable to load config.xml' });
    }, function (config) {
        res.json(config);
    });
};
exports.ApiCordovaProject = ApiCordovaProject;
var ApiPackageJson = function (req, res) {
    res.sendFile(path.join(process.cwd(), 'package.json'), {
        headers: {
            'content-type': 'application/json'
        }
    });
};
exports.ApiPackageJson = ApiPackageJson;
