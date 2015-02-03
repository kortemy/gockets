/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var that,
        CodeInspection = brackets.getModule("language/CodeInspection"),
        linter = {
            name: "GoLint",
            scanFile: function (text, path) {
                // TODO
                var error = {
                    pos: {
                        line: 3,
                        ch: 1
                    },
                    message: "Dummy message",
                    type: CodeInspection.Type.WARNING
                };
                return {
                    errors: [],
                    aborted: false
                };
            }
        };
    that = {
        init: function () {
            CodeInspection.register("go", linter);
        }
    };
    return that;

});