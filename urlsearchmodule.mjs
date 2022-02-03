var log, olog, ostr, print, cfg, fileManager;

//#############################################################################
//#region logPrintFunctions
log = function(arg) {
if (allModules.debugmodule.modulesToDebug["urlsearchmodule"] != null) {
    console.log("[urlsearchmodule]: " + arg);
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
import * as fs from "fs"


//#endregion

//#############################################################################

//#############################################################################
export function initialize() {
    log("urlsearchmodule.initialize");
    cfg = allModules.configmodule
    fileManager = allModules.filemanagermodule
};

  
//#############################################################################
//#region internalFunctions
function getURLDetails(filePath, fileString, match, start) {
    var details = {filePath}
    details.start = fileString.indexOf(match, start)
    var char = fileString.charAt(details.start-1)

    if( char === '"') {
        details.end = fileString.indexOf('"', details.start)
    } else if(char === "'") {
        details.end = fileString.indexOf('"', details.start)
    } else if(char === "(") {
        details.end = fileString.indexOf(')', details.start)
    } else {
        log("Warning, we had a url without apostrophes! Ignoring it for now.")
        details.end = details.start + 1
        log(fileString.slice(details.start - 3, details.end + 20))
        olog(details)
        log("- - - - -")
    }
    details.url = fileString.slice(details.start, details.end)
    return details
}

//#endregion

//#############################################################################
//#region exposedFunctions
export function search(filePath) {
    const fileObject = fileManager.getFileObject(filePath)
    const fileString = fileObject.fileString
    // log(fileString)

    const matches = fileString.match(cfg.regexURLDetect)
    // olog(matches)
    if(!matches) return []
    
    var urlDetails = []
    
    var details = {end: 0}

    for (let match of matches){
        let start = details.end
        details = getURLDetails(filePath, fileString, match, start)
        if(details.url.length > 2) {
            urlDetails.push(details)
        }
    }
    // olog(urlDetails)
    return urlDetails;
};

//#endregion
