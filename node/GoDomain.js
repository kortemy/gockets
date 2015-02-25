/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global define, brackets*/
(function () {
    "use strict";

    var os = require("os"),
        goFmtCmd = require("./FmtCmd.js"),
        goImportsCmd = require("./ImportsCmd.js"),
        goLintCmd = require("./LintCmd.js"),
        execute = function (command, args, callback) {
            var exec = require('child_process').execFile,
                puts = function (error, stdout, stderr) {
                    var code,
                        resp;
                    if (error === null) {
                        resp = stdout;
                        code = 0;
                    } else {
                        resp = error;
                        code = 1;
                    }
                    callback(resp, code);
                };
            return exec(command, args, puts);
        };
    
    /**
     * Initializes the test domain with several test commands.
     * @param {DomainManager} domainManager The DomainManager for the server
     */
    function init(domainManager) {
        if (!domainManager.hasDomain("go")) {
            domainManager.registerDomain("go", {
                major: 0,
                minor: 1
            });
            // fix $PATH on linux
            if (process.platform !== 'win32') {
                process.env.PATH = process.env.PATH + ":" + process.env.GOPATH + "/bin";
                process.env.PATH = process.env.PATH + ":/usr/local/go/bin";
            }
            console.log(process.env.PATH);
        }
        goFmtCmd.init(domainManager, execute);
        goImportsCmd.init(domainManager, execute);
        goLintCmd.init(domainManager);
        
    }

    exports.init = init;

}());