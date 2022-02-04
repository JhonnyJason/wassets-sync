"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cliStartup = cliStartup;
exports.initialize = initialize;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cfg, cliArguments, log, mainProcess, olog, ostr, print, printError, printSuccess; //#############################################################################

//#region logPrintFunctions
//#############################################################################
log = function log(arg) {
  if (allModules.debugmodule.modulesToDebug["startupmodule"] != null) {
    console.log("[startupmodule]: " + arg);
  }
};

olog = function olog(o) {
  return log("\n" + ostr(o));
};

ostr = function ostr(o) {
  return JSON.stringify(o, null, 4);
};

printSuccess = function printSuccess(arg) {
  return console.log(_chalk.default.green(arg));
};

printError = function printError(arg) {
  return console.log(_chalk.default.red(arg));
};

print = function print(arg) {
  return console.log(arg);
}; //#endregion
//#############################################################################
//#region localModules


mainProcess = null;
cfg = null;
cliArguments = null; //#endregion
//#############################################################################

function initialize() {
  log("startupmodule.initialize");
  mainProcess = allModules.mainprocessmodule;
  cfg = allModules.configmodule;
  cliArguments = allModules.cliargumentsmodule;
}

; //#############################################################################
//region exposedFunctions

function cliStartup() {
  return _cliStartup.apply(this, arguments);
}

function _cliStartup() {
  _cliStartup = _asyncToGenerator(function* () {
    var e, err;
    log("startupmodule.cliStartup");

    try {
      e = cliArguments.extractArguments();
      yield mainProcess.execute(e);
      return printSuccess('All done!');
    } catch (error) {
      err = error;
      printError("Error!");
      printError(err);

      if (err.stack) {
        printError(err.stack);
      }

      return process.exit(-1);
    }
  });
  return _cliStartup.apply(this, arguments);
}

; //#endregion exposed functions