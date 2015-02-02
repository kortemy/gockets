/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var that,
        GOFMT_CMD_ID = "go.gofmt",

        EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain = brackets.getModule("utils/NodeDomain"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule('command/Commands'),
        GoDomain = new NodeDomain("go", ExtensionUtils.getModulePath(module, "../node/GoDomain")),

        cursorPos,
        formatCallback = function (event, data, error) {
            var editor = EditorManager.getFocusedEditor(),
                doc = editor.document,
                cursorPos = editor.getCursorPos(),
                scrollPos = editor.getScrollPos();
            if (error === 0) {
                if (doc.getText() !== data) {
                    doc.setText(data);
                    editor.setCursorPos(cursorPos);
                    editor.setScrollPos(scrollPos.x, scrollPos.y);
                    CommandManager.execute(Commands.FILE_SAVE);
                }
            } else {
                (function () {
                    var Dialogs = brackets.getModule("widgets/Dialogs"),
                        clazz = "go-error-dialog",
                        title = "Not installed?",
                        message = "Error: <br/>" + JSON.stringify(data),
                        buttons = [{
                            className: "go-error-dialog-btn",
                            id: "",
                            text: "OK"
                        }];
                    Dialogs.showModalDialog(clazz, title, message, buttons);
                }());
            }
        },
        format = function () {
            var FileUtils = brackets.getModule("file/FileUtils"),
                editor = EditorManager.getFocusedEditor(),
                doc = editor.document,
                file = doc.file,
                path = file.fullPath;
            if (editor && FileUtils.getFileExtension(path) === 'go') {
                GoDomain.exec("fmt", path);
            }
        };

    that = {
        init: function () {
            var DocumentManager = brackets.getModule("document/DocumentManager"),
                KBManager = brackets.getModule("command/KeyBindingManager");
            CommandManager.register("Do gofmt", GOFMT_CMD_ID, format);
            DocumentManager.on("documentSaved", format);
            KBManager.addBinding(GOFMT_CMD_ID, "Ctrl-Alt-F");
            GoDomain.on("fmtresp", formatCallback);
        }
    };
    return that;

});