"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileObject = getFileObject;
exports.saveFiles = saveFiles;

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var allAbsolutePaths, extractPathsRecurse, rootAbsolute, log, olog, ostr, print, cfg; //#############################################################################
//#region logPrintFunctions

log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["filemanagermodule"] != null) {
    console.log("[filemanagermodule]: " + arg);
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
var cachedFiles = {}; //#############################################################################
//#region exposedFunctions

function getFileObject(path) {
  var fileObject = cachedFiles[path];

  if (fileObject) {
    return fileObject;
  } else {
    fileObject = {
      path
    };
    fileObject.fileString = fs.readFileSync(path, {
      encoding: 'utf8',
      flag: 'r'
    });
    cachedFiles[path] = fileObject;
    return fileObject;
  }
}

;

function saveFiles() {
  for (var path in cachedFiles) {
    var fileObject = cachedFiles[path];
    fs.writeFileSync(path, fileObject.fileString);
  }
} //#endregion