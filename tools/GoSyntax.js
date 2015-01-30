/*global define,brackets,console,CodeMirror*/
define(function (require, exports, module) {
    'use strict';
    var LanguageManager = brackets.getModule("language/LanguageManager"),
        that = {
            id: "go.syntax",
            init: function () {
                CodeMirror.defineMIME("text/x-go", "go");
                LanguageManager.defineLanguage("go", {
                    name: "Golang",
                    mode: "go",
                    fileExtensions: ["go"],
                    blockComment: ["/*", "*/"],
                    lineComment: ["//", "//"]
                });
            }
        };
    return that;

});