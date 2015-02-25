/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global define, brackets*/
"use strict";
var response,
    execute,
    domain = "go",
    command = "golint",
    event = "golint_response",
    params = [{
        name: "path", // parameters
        type: "string",
        description: "Path to a file to be linted"
    }],
    returnValues = [{
        name: "data", // return values
        type: "string",
        description: "Formatted file content."
    }],
    execute = function (command, args, callback) {
        var exec = require('child_process').execFile,
            puts = function (error, stdout, stderr) {
                var code,
                    resp;
                console.log("StdOut: " + stdout);
                console.log("StdErr: " + stderr);
                console.log("Error: " + error);
                if (!error) {
                    resp = stdout || stderr;
                    code = stdout ? 0 : 1;
                } else {
                    resp = error;
                    code = -1;
                }
                callback(resp, code);
            };
        return exec(command, args, puts);
    },
    handler = function (file) {
        var process = execute(command, [file], response);
    };

exports.init = function (domainManager) {
    response = function (data, error) {
        domainManager.emitEvent(domain, event, [data, error]);
    };
    domainManager.registerCommand(
        domain, // domain name
        command, // command name
        handler, // command handler function
        false, // this command is synchronous in Node
        "Linter for Go code",
        params,
        returnValues
    );
    domainManager.registerEvent(
        domain, // domain name
        event, // event name
        [{
            name: "data",
            type: "string",
            description: "payload"
        }, {
            name: "error",
            type: "number",
            description: "error code"
        }]
    );
    
};