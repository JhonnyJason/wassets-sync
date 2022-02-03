var allAbsolutePaths, extractPathsRecurse, rootAbsolute, log, olog, ostr, print, cfg;

//#############################################################################
//#region logPrintFunctions
log = function(arg) {
if (allModules.debugmodule.modulesToDebug["directorymodule"] != null) {
    console.log("[directorymodule]: " + arg);
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
import * as path from "path"
import * as fs from "fs"


//#endregion

//#############################################################################
allAbsolutePaths = [];
cfg = null

//#############################################################################
export function initialize() {
    log("directorymodule.initialize");
    cfg = allModules.configmodule
};

  
//#############################################################################
//#region internalFunctions
extractPathsRecurse = function(files, newRoot) {
    var file, i, len;
    for (i = 0, len = files.length; i < len; i++) {
        file = files[i];

        let filePath = path.resolve(newRoot, file)
        if (fs.lstatSync(filePath).isDirectory()) {
            let subFiles = fs.readdirSync(filePath)
            extractPathsRecurse(subFiles, filePath);
        } else if(!cfg.regexExcludeScan.test(filePath)) {
            allAbsolutePaths.push(filePath);
        }
    }
};

//#endregion

//#############################################################################
//#region exposedFunctions
export function digest(root) {
    rootAbsolute = path.resolve(root);
    log(rootAbsolute)
    const files = fs.readdirSync(rootAbsolute)
    extractPathsRecurse(files, rootAbsolute);
};

//#############################################################################
export function getFiles() {
    return allAbsolutePaths;
};

export function getRoot() {
    return rootAbsolute
}
//#endregion
