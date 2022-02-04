"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlsearchmodule = exports.startupmodule = exports.mainprocessmodule = exports.filemanagermodule = exports.directorymodule = exports.debugmodule = exports.configmodule = exports.cliargumentsmodule = exports.assetloadermodule = void 0;

var assetloadermodule = _interopRequireWildcard(require("./assetloadermodule.js"));

exports.assetloadermodule = assetloadermodule;

var cliargumentsmodule = _interopRequireWildcard(require("./cliargumentsmodule.js"));

exports.cliargumentsmodule = cliargumentsmodule;

var configmodule = _interopRequireWildcard(require("./configmodule.js"));

exports.configmodule = configmodule;

var debugmodule = _interopRequireWildcard(require("./debugmodule.js"));

exports.debugmodule = debugmodule;

var directorymodule = _interopRequireWildcard(require("./directorymodule.js"));

exports.directorymodule = directorymodule;

var filemanagermodule = _interopRequireWildcard(require("./filemanagermodule.js"));

exports.filemanagermodule = filemanagermodule;

var mainprocessmodule = _interopRequireWildcard(require("./mainprocessmodule.js"));

exports.mainprocessmodule = mainprocessmodule;

var startupmodule = _interopRequireWildcard(require("./startupmodule.js"));

exports.startupmodule = startupmodule;

var urlsearchmodule = _interopRequireWildcard(require("./urlsearchmodule.js"));

exports.urlsearchmodule = urlsearchmodule;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }