/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var LanguageManager = brackets.getModule("language/LanguageManager"),
        CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        that = {
            id: "go.syntax",
            init: function () {
                CodeMirror.defineMIME("text/x-go", "go");
                LanguageManager.defineLanguage("go", {
                    name: "Go (Golang)",
                    mode: "go",
                    fileExtensions: ["go"],
                    blockComment: ["/*", "*/"],
                    lineComment: ["//", "//"]
                });
            }
        };
    return that;

});