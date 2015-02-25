/*global define,brackets,console,$*/
define(function (require, exports, module) {
    'use strict';
    var that,
        GOLINT = "golint",
        GOLINT_RESP = "golint_response",
        GOLINT_CMD_ID = "go.golint",
        CodeInspection = brackets.getModule("language/CodeInspection"),
        GoDomain,
        Deferred = $.Deferred(),
        linter = {
            name: "GoLint",
            scanFileAsync: function (text, path) {
                var promise = GoDomain.exec(GOLINT, path),
                    error = {
                        pos: {
                            line: 3,
                            ch: 1
                        },
                        message: "Dummy message",
                        type: CodeInspection.Type.WARNING
                    };
                promise.done(function (a1, a2, a3, a4, a5) {
                    console.log(a1);
                    console.log(a2);
                    console.log(a3);
                    console.log(a4);
                    console.log(a5);
                });
                
                return $.promise("obj", {
                    errors: [],
                    aborted: false
                });
            }
        },
        lintCallback = function (event, data, error) {
            Deferred.resolve(data);
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