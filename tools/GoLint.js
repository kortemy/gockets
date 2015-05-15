/*global define,brackets,console,$*/
define(function (require, exports, module) {
    'use strict';
    var that,
        GOLINT = "golint",
        GOLINT_RESP = "golint_response",
        GOLINT_CMD_ID = "go.golint",
        pref = "pref.golint",
        
        EditorManager = brackets.getModule("editor/EditorManager"),
        CodeInspection = brackets.getModule("language/CodeInspection"),
        CommandManager = brackets.getModule("command/CommandManager"),
        FileUtils = brackets.getModule("file/FileUtils"),
        GoDomain,
        Deferred,
        parseLine = function (lineStr) {
            var filenameExp = /([^(\\|\/)]+\.go)/,
                messageExp = /\d+:\d+:(.+)/,
                lineExp = /\.go:(\d+:\d+:)/,
                filename = filenameExp.exec(lineStr)[1] || '',
                message = messageExp.exec(lineStr)[1] || '',
                lines = lineExp.exec(lineStr)[1] || '',
                line = lines.split(':')[0],
                ch = lines.split(':')[1],
                text = message + "\t\t";
            return {
                pos: {
                    line: parseInt(line, 10) - 1,
                    ch: parseInt(ch, 10) - 1
                },
                message: text,
                type: CodeInspection.Type.WARNING
            };
        },
        parseErrors = function (lines) {
            var resp = [];
            lines.forEach(function (e) {
                if (e || e !== '') {
                    resp.push(parseLine(e));
                }
            });
            return resp;
        },
        linter = {
            name: "GoLint",
            scanFileAsync: function (text, path) {
                var PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
                    StateManager = PreferencesManager.stateManager.getPrefixedSystem("gockets");
                Deferred = $.Deferred();
                if (StateManager.get(pref)) {
                    GoDomain.exec(GOLINT, path);
                } else {
                    Deferred.resolve(null);
                }
                return Deferred;
            }
        },
        lintCallback = function (event, data, error) {
            var lines = data.match(/[^\r\n]+/g);
            if (lines) {
                Deferred.resolve({
                    errors: parseErrors(lines),
                    aborted: false
                });
            } else {
                Deferred.resolve(null);
            }
        };
    that = {
        init: function (domain) {
            GoDomain = domain;
            CodeInspection.register("go", linter);
            GoDomain.on(GOLINT_RESP, lintCallback);
        },
        getCommand: function () {
            return GOLINT_CMD_ID;
        }
    };
    return that;

});