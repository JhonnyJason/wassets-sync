"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.syncAssets = syncAssets;

var _nodeFetchCommonjs = _interopRequireDefault(require("node-fetch-commonjs"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log, olog, ostr, print, cfg, dir, fileManager; //#############################################################################
//#region logPrintFunctions

log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["assetloadermodule"] != null) {
    console.log("[assetloadermodule]: " + arg);
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
var assetBase = null;
var rootEnd = null;
var allAssets = []; //#############################################################################

function initialize() {
  log("assetloadermodule.initialize");
  cfg = allModules.configmodule;
  dir = allModules.directorymodule;
  fileManager = allModules.filemanagermodule;
} //#############################################################################
//#region internalFunctions


function assertDirectoryExists() {
  var root = dir.getRoot();
  rootEnd = root.length;
  assetBase = path.resolve(root, cfg.loadedAssetsDir);
  fs.mkdirSync(assetBase, {
    "recursive": true
  }); // log(assetBase)
}

function replaceURL(asset) {
  if (!asset.loaded) {
    log("Asset was not loaded!");
    olog(asset);
    log("- - - -");
    return;
  }

  var fileObject = fileManager.getFileObject(asset.linkFilePath);
  fileObject.fileString = fileObject.fileString.replace(asset.oldURL, asset.newURL);
}

function loadAsset(_x, _x2, _x3) {
  return _loadAsset.apply(this, arguments);
}

function _loadAsset() {
  _loadAsset = _asyncToGenerator(function* (remoteURL, localDir, assetObj) {
    try {
      var response = yield (0, _nodeFetchCommonjs.default)(remoteURL);
      response.body.pipe(fs.createWriteStream(localDir));
      assetObj.loaded = true;
    } catch (error) {
      log("Error! Image could not be loaded!\n" + remoteURL + "\n" + error);
      assetObj.loaded = false;
    }
  });
  return _loadAsset.apply(this, arguments);
}

function loadAssets(_x4) {
  return _loadAssets.apply(this, arguments);
} //#endregion
//#############################################################################
//#region exposedFunctions


function _loadAssets() {
  _loadAssets = _asyncToGenerator(function* (urlObject) {
    // log(urlObject.url)
    var urlString = urlObject.url;
    urlString = urlString.replaceAll(" ", ",");
    urlString = urlString.replaceAll("?", ",");
    var tokens = urlString.split(","); //currently focusing on images

    var imageURLs = tokens.filter(el => cfg.regexImageURLExact.test(el)); // olog(imageURLs)

    var promises = [];

    for (var imageURL of imageURLs) {
      var imageObj = {};
      imageObj.linkFilePath = urlObject.filePath;
      var nameStart = imageURL.lastIndexOf("/") + 1;
      var imageName = imageURL.slice(nameStart);
      imageObj.name = imageName;
      var imagePath = path.resolve(assetBase, imageName); // imageObj.storeDir = imagePath

      imageObj.newURL = imagePath.slice(rootEnd + 1);
      imageObj.oldURL = imageURL; // olog(imageObj)

      allAssets.push(imageObj);
      promises.push(loadAsset(imageURL, imagePath, imageObj));
    }

    yield Promise.all(promises);
  });
  return _loadAssets.apply(this, arguments);
}

function syncAssets(_x5) {
  return _syncAssets.apply(this, arguments);
} //#endregion


function _syncAssets() {
  _syncAssets = _asyncToGenerator(function* (urls) {
    assertDirectoryExists();
    var promises = [];

    for (var url of urls) {
      promises.push(loadAssets(url));
    }

    yield Promise.all(promises);
    olog(allAssets);

    for (var asset of allAssets) {
      replaceURL(asset);
    }

    fileManager.saveFiles();
  });
  return _syncAssets.apply(this, arguments);
}