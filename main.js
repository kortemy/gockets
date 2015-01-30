/*global CodeMirror*/
/*global define*/
/*global brackets*/
define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule("utils/AppInit");

    AppInit.appReady(function () {
        var GoFormat = require("tools/GoFormat"),
            GoSyntax = require("tools/GoSyntax"),

            CommandManager = brackets.getModule("command/CommandManager"),
            Menus = brackets.getModule("command/Menus"),
            
            
            initMenu = function () {
                var goMenu = Menus.addMenu("Go", "go.menu", Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
                
                goMenu.addMenuItem(GoFormat.gofmtid);
                goMenu.addMenuItem(GoFormat.gofmtonsaveid);
            };
        GoFormat.init();
        GoSyntax.init();
        initMenu();
    });
});