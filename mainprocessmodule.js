"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.initialize = initialize;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//#############################################################################
//#region logPrintFunctions
log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["mainprocessmodule"] != null) {
    console.log("[mainprocessmodule]: " + arg);
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


var cfg, dir, log, olog, ostr, print, urlSearch, loader; //#############################################################################
//#region modulesFromEnvironment

cfg = null;
dir = null;
urlSearch = null;
loader = null; //#endregion
//#############################################################################

function initialize() {
  log("mainprocessmodule.initialize");
  cfg = allModules.configmodule;
  dir = allModules.directorymodule;
  urlSearch = allModules.urlsearchmodule;
  loader = allModules.assetloadermodule;
}

; //#############################################################################
//#region internalFunctions

function urlIsRelevant(url, originURL) {
  var isOfOrigin = url.indexOf(originURL) === 0;
  var isImage = cfg.regexImagePlus.test(url);
  log(url);
  log(originURL);
  log("---");

  if (isOfOrigin) {
    return isImage;
  } // for (let origin of cfg.relevantOrigins) {
  //     let isOfOrigin = url.indexOf(origin) === 0
  //     let isImage = cfg.regexImagePlus.test(url)
  //     if(isOfOrigin) {return isImage}
  // }


  return false;
} //#endregion
//#############################################################################
//#region exposedFunctions


function execute(_x) {
  return _execute.apply(this, arguments);
}

function _execute() {
  _execute = _asyncToGenerator(function* (e) {
    log("mainprocessmodule.execute");
    olog(e);
    dir.digest(e.directory);
    var files = dir.getFiles(); // olog(files);
    // return

    var allURLs = [];

    for (var file of files) {
      var foundURLS = urlSearch.search(file); // return

      allURLs.push(...foundURLS);
    }

    var relevantURLs = allURLs.filter(el => urlIsRelevant(el.url, e.url)); // olog(relevantURLs)

    yield loader.syncAssets(relevantURLs);
  });
  return _execute.apply(this, arguments);
}

; //#endregion