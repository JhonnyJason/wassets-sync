var allAbsolutePaths, extractPathsRecurse, rootAbsolute, log, olog, ostr, print, cfg;

//#############################################################################
//#region logPrintFunctions
log = function(arg) {
if (allModules.debugmodule.modulesToDebug["filemanagermodule"] != null) {
    console.log("[filemanagermodule]: " + arg);
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
const cachedFiles = {}

//#############################################################################
//#region exposedFunctions
export function getFileObject(path) {
    var fileObject = cachedFiles[path]
    if(fileObject) {
        return fileObject
    } else {
        fileObject = {path}
        fileObject.fileString = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
        cachedFiles[path] = fileObject
        return fileObject
    }
};

export function saveFiles() {
    for(let path in cachedFiles) {
        let fileObject = cachedFiles[path]
        fs.writeFileSync(path, fileObject.fileString)
    }
}
//#endregion
