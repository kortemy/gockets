/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var that,
        GOFMT_ID = "go.gofmt",
        GOFMT_ONSAVE_ID = "go.gofmtonsave",
        GOFMT_ONSAVE_PREF = "go.gofmtonsavepref",
        
        EditorManager = brackets.getModule("editor/EditorManager"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule('command/Commands'),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        DocumentCommandHandlers = brackets.getModule("document/DocumentCommandHandlers"),
        KBManager = brackets.getModule("command/KeyBindingManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain = brackets.getModule("utils/NodeDomain"),
        FileUtils = brackets.getModule("file/FileUtils"),
        GoDomain = new NodeDomain("go", ExtensionUtils.getModulePath(module, "../node/GoDomain")),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        stateManager = PreferencesManager.stateManager.getPrefixedSystem("gockets"),
        
        initPrefs = function () {
            stateManager.definePreference(GOFMT_ONSAVE_PREF, "boolean", true);
        },
        
        cursorPos,
        formatCallback = function (event, data, error) {
            var editor = EditorManager.getFocusedEditor(),
                doc = editor.document,
                cursorPos = editor.getCursorPos(),
                scrollPos = editor.getScrollPos();
            if (error) {
                console.log("TODO: Handle " + error);
            }
            if (doc.getText() !== data) {
                doc.setText(data);
                editor.setCursorPos(cursorPos);
                editor.setScrollPos(scrollPos.x, scrollPos.y);
                CommandManager.execute(Commands.FILE_SAVE);
            }
        },
        format = function () {
            var editor = EditorManager.getFocusedEditor(),
                doc = editor.document,
                file = doc.file,
                path = file.fullPath;
            if (editor && FileUtils.getFileExtension(path) === 'go') {
                GoDomain.exec("fmt", path);
            }
        },
        formatFromSave = function () {
            var checked = stateManager.get(GOFMT_ONSAVE_PREF);
            if (checked) {
                format();
            }
        },
        changePref = function () {
            var checked = stateManager.get(GOFMT_ONSAVE_PREF);
            stateManager.set(GOFMT_ONSAVE_PREF, !checked);
            CommandManager.get(GOFMT_ONSAVE_ID).setChecked(!checked);
            console.log(stateManager.get(GOFMT_ONSAVE_PREF));
        };

    that = {
        gofmtid: GOFMT_ID,
        gofmtonsaveid:  GOFMT_ONSAVE_ID,
        init: function () {
            initPrefs();
            var gofmtCommand = CommandManager.register("gofmt", GOFMT_ID, format),
                gofmtonsaveCommand = CommandManager.register("gofmt on Save", GOFMT_ONSAVE_ID, changePref),
                checked = stateManager.get(GOFMT_ONSAVE_PREF);
            DocumentManager.on("documentSaved", formatFromSave);
            KBManager.addBinding(GOFMT_ID, "Ctrl-Alt-F");
            GoDomain.on("fmtresp", formatCallback);
            
            gofmtonsaveCommand.setChecked(checked);
        }
    };
    return that;

});