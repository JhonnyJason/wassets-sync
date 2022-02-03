//#############################################################################
//#region logPrintFunctions
log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["mainprocessmodule"] != null) {
        console.log("[mainprocessmodule]: " + arg);
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

var cfg, dir, log, olog, ostr, print, urlSearch, loader;

//#############################################################################
//#region modulesFromEnvironment
cfg = null;
dir = null;
urlSearch = null;
loader = null;

//#endregion

//#############################################################################
export function initialize() {
    log("mainprocessmodule.initialize");
    cfg = allModules.configmodule;
    dir = allModules.directorymodule;
    urlSearch = allModules.urlsearchmodule
    loader = allModules.assetloadermodule
};


//#############################################################################
//#region internalFunctions
function urlIsRelevant(url, originURL) {
    
    let isOfOrigin = url.indexOf(originURL) === 0
    let isImage = cfg.regexImagePlus.test(url)
    
    log(url)
    log(originURL)
    log("---")

    if(isOfOrigin) {return isImage}

    // for (let origin of cfg.relevantOrigins) {
    //     let isOfOrigin = url.indexOf(origin) === 0
    //     let isImage = cfg.regexImagePlus.test(url)

    //     if(isOfOrigin) {return isImage}
    // }
    return false
}
//#endregion

//#############################################################################
//#region exposedFunctions

export async function execute(e) {
    log("mainprocessmodule.execute");
    olog(e);
    dir.digest(e.directory);
    const files = dir.getFiles();
    // olog(files);
    // return

    const allURLs = []    
    for (let file of files) {
        let foundURLS = urlSearch.search(file)
        // return
        allURLs.push(...foundURLS)
    }

    const relevantURLs = allURLs.filter((el) => urlIsRelevant(el.url, e.url))
    // olog(relevantURLs)
    await loader.syncAssets(relevantURLs)

};

//#endregion

