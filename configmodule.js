"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ultimateURLRegex = exports.relevantOrigins = exports.regexURLDetect = exports.regexImageURLExact = exports.regexImagePlus = exports.regexExcludeScan = exports.loadedAssetsDir = exports.cli = void 0;
//region exposedProperties
var cli = {
  name: ""
};
exports.cli = cli;
var loadedAssetsDir = "external-assets";
exports.loadedAssetsDir = loadedAssetsDir;
var regexExcludeScan = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico|woff|eot|ttf|js|css).*$/i; // export const regexURLDetect = /(https?:\/\/[^\s]+)/g

exports.regexExcludeScan = regexExcludeScan;
var regexURLDetect = /(https?:\/\/)/g;
exports.regexURLDetect = regexURLDetect;
var relevantOrigins = ["https://arcweave.com"];
exports.relevantOrigins = relevantOrigins;
var regexImagePlus = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico).*$/i;
exports.regexImagePlus = regexImagePlus;
var regexImageURLExact = /(https?):\/\/.*\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico)$/i;
exports.regexImageURLExact = regexImageURLExact;
var ultimateURLRegex = /(https?:\/\/)(([^|`´#\^\[\]{}=,"'()? <>]+\.)([^|`´#\^\[\]{}=,"'()? <>]+\/))([^|`´#\^\[\]{}=,"'()? <>]*\/)*([^|`´#\^\[\]{}=,"'()? <>]+)\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico|js|css)/gm;
exports.ultimateURLRegex = ultimateURLRegex;