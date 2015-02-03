/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var that,
        GOFMT = "gofmt",
        GOFMT_RESP = "gofmt_response",
        GOFMT_CMD_ID = "go.gofmt",

        EditorManager = brackets.getModule("editor/EditorManager"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule('command/Commands'),
        GoDomain,
        GoMenu,
        triggered,
        formatCallback = function (event, data, error) {
            if (triggered) {
                triggered = false;
                if (error === 0) {
                    (function () {
                        var editor = EditorManager.getFocusedEditor(),
                            doc = editor.document,
                            cursorPos = editor.getCursorPos(),
                            scrollPos = editor.getScrollPos();
                        if (doc.getText() !== data) {
                            doc.setText(data);
                            editor.setCursorPos(cursorPos);
                            editor.setScrollPos(scrollPos.x, scrollPos.y);
                            //CommandManager.execute(Commands.FILE_SAVE);
                        }
                    }());
                } else {
                    (function () {
                        var Dialogs = require("ext/Dialogs");
                        Dialogs.showError(GOFMT, data);
                    }());
                }
            }
        },
        format = function () {
            var FileUtils = brackets.getModule("file/FileUtils"),
                editor = EditorManager.getFocusedEditor(),
                doc = editor.document,
                file = doc.file,
                path = file.fullPath;
            if (editor && FileUtils.getFileExtension(path) === 'go') {
                triggered = true;
                GoDomain.exec(GOFMT, path);
            }
        };

    that = {
        init: function (domain, menu) {
            GoDomain = domain;
            GoMenu = menu;
            var DocumentManager = brackets.getModule("document/DocumentManager"),
                Menus = brackets.getModule("command/Menus");
            
            CommandManager.register("Do gofmt", GOFMT_CMD_ID, format);
            GoMenu.addMenuItem(GOFMT_CMD_ID);
            //DocumentManager.on("documentSaved", format);
            GoDomain.on(GOFMT_RESP, formatCallback);
        },
        getCommand: function () {
            return GOFMT_CMD_ID;
        }
    };
    return that;

});