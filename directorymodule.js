"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.digest = digest;
exports.getFiles = getFiles;
exports.getRoot = getRoot;
exports.initialize = initialize;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var allAbsolutePaths, _extractPathsRecurse, rootAbsolute, log, olog, ostr, print, cfg; //#############################################################################
//#region logPrintFunctions


log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["directorymodule"] != null) {
    console.log("[directorymodule]: " + arg);
  }
};

olog = function olog(o) {
  return log("\n" + ostr(o));
};

ostr = function ostr(o) {
  return JSON.stringify(o, null, 4);
};

print = function print(arg) {
  return console.log(arg);
}; //#endregion
//#############################################################################
//#region modulesFromEnvironment


//#endregion
//#############################################################################
allAbsolutePaths = [];
cfg = null; //#############################################################################

function initialize() {
  log("directorymodule.initialize");
  cfg = allModules.configmodule;
}

; //#############################################################################
//#region internalFunctions

_extractPathsRecurse = function extractPathsRecurse(files, newRoot) {
  var file, i, len;

  for (i = 0, len = files.length; i < len; i++) {
    file = files[i];
    var filePath = path.resolve(newRoot, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      var subFiles = fs.readdirSync(filePath);

      _extractPathsRecurse(subFiles, filePath);
    } else if (!cfg.regexExcludeScan.test(filePath)) {
      allAbsolutePaths.push(filePath);
    }
  }
}; //#endregion
//#############################################################################
//#region exposedFunctions


function digest(root) {
  rootAbsolute = path.resolve(root);
  log(rootAbsolute);
  var files = fs.readdirSync(rootAbsolute);

  _extractPathsRecurse(files, rootAbsolute);
}

; //#############################################################################

function getFiles() {
  return allAbsolutePaths;
}

;

function getRoot() {
  return rootAbsolute;
} //#endregion