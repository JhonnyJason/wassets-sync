#!/usr/bin/env node
import * as Modules from "./allmodules.mjs"
// const Modules = require("./allmodules.mjs")

global.allModules = Modules;

const run = async function() {
    var m, n, promises;
    promises = (function() {
        var results;
        results = [];
        for (n in Modules) {
                m = Modules[n];
                if(typeof(m.initialize) == "function") {
                    results.push(m.initialize());
                }
        }
        return results;
    })();
    await Promise.all(promises);
    Modules.startupmodule.cliStartup();
}

run();
