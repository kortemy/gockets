/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global define, brackets*/
(function () {
    "use strict";

    var os = require("os"),
        execute = function (command, callback) {
            var os = require('os'),
                sys = require('sys'),
                exec = require('child_process').exec,
                puts = function (error, stdout, stderr) {
                    callback(stdout, error);
                };
            return exec(command, puts);
        },
        goFmtResponse,
        gofmt = function (file) {
            var process = execute("gofmt " + file, goFmtResponse);
        },
        initGoFmtCommand = function (domainManager) {
            domainManager.registerCommand(
                "go", // domain name
                "fmt", // command name
                gofmt, // command handler function
                false, // this command is synchronous in Node
                "Formats Go code",
                [{
                    name: "path", // parameters
                    type: "string",
                    description: "Path to a file to be formatted"
                }],
                [{
                    name: "data", // return values
                    type: "string",
                    description: "Formatted file content."
                }]
            );
            domainManager.registerEvent(
                "go",     // domain name
                "fmtresp",         // event name
                [{
                    name: "data",
                    type: "string",
                    description: "payload"
                }, {
                    name: "error",
                    type: "string",
                    description: "error message"
                }]
            );
            goFmtResponse = function (data, error) {
                domainManager.emitEvent("go", "fmtresp", [data, error]);
            };
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
        }
        initGoFmtCommand(domainManager);
        
        
    }

    exports.init = init;

}());