//#region logPrintFunctions
function log(arg) {
  if (allModules.debugmodule.modulesToDebug["cliargumentsmodule"] != null) {
    console.log("[cliargumentsmodule]: " + arg);
  }
};
//#endregion 
import meow from "meow";

//#############################################################
export function initialize() {
  log("cliargumentsmodule.initialize");
}

//#############################################################
//#region internal functions
function getHelpText() {
  log("getHelpText");
  return `Usage
    $ copy-website-assets <arg1> <arg2>
    
Options
    required:
        arg1, --url <url>, -u <url>
            url to the remote origin live-version of the website
            if it does not start with https:// https:// will be prepended#
    
    optional:
        arg2, --directory <path-directory>, -d <path-directory>
            path to the local directory which is document root of the website clone
            default is current working directory
        
Examples
    $  copy-website-assets arcweave.com
    ...`;
};

function getOptions() {
  log("getOptions");
  return {
    flags: {
      url: {
        type: "string",
        alias: "u"
      },
      directory: { //optionsname
        type: "string", // or string
        alias: "d"
      }
    },
    importMeta: import.meta
  };
};

function extractMeowed(meowed) {
  var URL, directory, url;
  log("extractMeowed");
  url = null;
  directory = null;
  if (meowed.input[0]) {
    url = meowed.input[0];
  }
  if (meowed.input[1]) {
    directory = meowed.input[1];
  }
  if (meowed.flags.url) {
    URL = meowed.flags.url;
  }
  if (meowed.flags.directory) {
    directory = meowed.flags.directory;
  }
  if (!directory) {
    directory = ".";
  }
  if (!url) {
    throw new Error("Usage: you need to provide an url, run $ copy-website-assets --help for usage information!");
  }
  url = url.toLowerCase();
  if (url.indexOf("https://") < 0) {
    url = "https://" + url;
  }
  return {directory, url};
};

//#endregion

//#############################################################
export function extractArguments() {
    var extract, meowed, options;
    log("cliargumentsmodule.extractArguments");
    options = getOptions();
    meowed = meow(getHelpText(), getOptions());
    extract = extractMeowed(meowed);
    return extract;
};