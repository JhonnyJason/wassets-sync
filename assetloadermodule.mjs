var log, olog, ostr, print, cfg, dir, fileManager;

//#############################################################################
//#region logPrintFunctions
log = function(arg) {
if (allModules.debugmodule.modulesToDebug["assetloadermodule"] != null) {
    console.log("[assetloadermodule]: " + arg);
}
};

olog = function(o) {
return log("\n" + ostr(o));
};

ostr = function(o) {
return JSON.stringify(o, null, 4);
};

print = function(arg) {
return console.log(arg);
};

//#endregion

//#############################################################################
//#region modulesFromEnvironment
import fetch from "node-fetch"
import * as fs from "fs"
import * as path from "path"


//#endregion

//#############################################################################
var assetBase = null
var rootEnd = null
const allAssets = []

//#############################################################################
export function initialize() {
    log("assetloadermodule.initialize");
    cfg = allModules.configmodule
    dir = allModules.directorymodule
    fileManager = allModules.filemanagermodule
}

  
//#############################################################################
//#region internalFunctions
function assertDirectoryExists() {
    const root = dir.getRoot()
    rootEnd = root.length
    assetBase = path.resolve(root, cfg.loadedAssetsDir)
    fs.mkdirSync(assetBase, {"recursive":true})
    // log(assetBase)
}

function replaceURL(asset) {
    if(!asset.loaded) {
        log("Asset was not loaded!")
        olog(asset)
        log("- - - -")
        return
    }
    const fileObject = fileManager.getFileObject(asset.linkFilePath)
    fileObject.fileString = fileObject.fileString.replace(asset.oldURL, asset.newURL)
}

async function loadAsset(remoteURL, localDir, assetObj) {
    try {
        var response = await fetch(remoteURL)
        response.body.pipe(fs.createWriteStream(localDir))
        assetObj.loaded = true
    } catch(error) {
        log("Error! Image could not be loaded!\n"+remoteURL+"\n"+error)
        assetObj.loaded = false
    }
}

async function loadAssets(urlObject) {
    // log(urlObject.url)
    var urlString = urlObject.url
    urlString = urlString.replaceAll(" ", ",")
    urlString = urlString.replaceAll("?", ",")
    const tokens = urlString.split(",")
    
    //currently focusing on images
    const imageURLs = tokens.filter((el) => cfg.regexImageURLExact.test(el))
    
    // olog(imageURLs)
    const promises = []

    for (let imageURL of imageURLs) {
        let imageObj = {}
        imageObj.linkFilePath = urlObject.filePath
        let nameStart = imageURL.lastIndexOf("/") + 1
        let imageName = imageURL.slice(nameStart)
        imageObj.name = imageName
        let imagePath = path.resolve(assetBase, imageName)
        // imageObj.storeDir = imagePath
        imageObj.newURL = imagePath.slice(rootEnd + 1)
        imageObj.oldURL = imageURL
        // olog(imageObj)

        allAssets.push(imageObj)
        promises.push(loadAsset(imageURL, imagePath, imageObj))
    }
    await Promise.all(promises);
}

//#endregion

//#############################################################################
//#region exposedFunctions
export async function syncAssets(urls) {
    assertDirectoryExists()

    const promises = [];
    for (let url of urls) {
        promises.push(loadAssets(url))
    }
    await Promise.all(promises)

    olog(allAssets)
    for (let asset of allAssets) {
        replaceURL(asset)
    }
    fileManager.saveFiles()
}

//#endregion
