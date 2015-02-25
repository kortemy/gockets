/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global define, brackets*/
"use strict";
var goFmtResponse;
exports.init = function (domainManager, execute) {
    domainManager.registerCommand(
        "go", // domain name
        "gofmt", // command name
        function (file) {
            var process = execute("gofmt", [file], goFmtResponse);
        }, // command handler function
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
        "go", // domain name
        "gofmt_response", // event name
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
    goFmtResponse = function (data, error) {
        domainManager.emitEvent("go", "gofmt_response", [data, error]);
    };
};