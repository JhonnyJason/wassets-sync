"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.search = search;

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var log, olog, ostr, print, cfg, fileManager; //#############################################################################
//#region logPrintFunctions

log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["urlsearchmodule"] != null) {
    console.log("[urlsearchmodule]: " + arg);
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
//#############################################################################
function initialize() {
  log("urlsearchmodule.initialize");
  cfg = allModules.configmodule;
  fileManager = allModules.filemanagermodule;
}

; //#############################################################################
//#region internalFunctions

function getURLDetails(filePath, fileString, match, start) {
  var details = {
    filePath
  };
  details.start = fileString.indexOf(match, start);
  var char = fileString.charAt(details.start - 1);

  if (char === '"') {
    details.end = fileString.indexOf('"', details.start);
  } else if (char === "'") {
    details.end = fileString.indexOf('"', details.start);
  } else if (char === "(") {
    details.end = fileString.indexOf(')', details.start);
  } else {
    log("Warning, we had a url without apostrophes! Ignoring it for now.");
    details.end = details.start + 1;
    log(fileString.slice(details.start - 3, details.end + 20));
    olog(details);
    log("- - - - -");
  }

  details.url = fileString.slice(details.start, details.end);
  return details;
} //#endregion
//#############################################################################
//#region exposedFunctions


function search(filePath) {
  var fileObject = fileManager.getFileObject(filePath);
  var fileString = fileObject.fileString; // log(fileString)

  var matches = fileString.match(cfg.regexURLDetect); // olog(matches)

  if (!matches) return [];
  var urlDetails = [];
  var details = {
    end: 0
  };

  for (var match of matches) {
    var start = details.end;
    details = getURLDetails(filePath, fileString, match, start);

    if (details.url.length > 2) {
      urlDetails.push(details);
    }
  } // olog(urlDetails)


  return urlDetails;
}

; //#endregion