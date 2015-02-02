/*global CodeMirror*/
/*global define*/
/*global brackets*/
define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule("utils/AppInit");

    AppInit.appReady(function () {
        var GoFormat = require("tools/GoFormat"),
            GoSyntax = require("tools/GoSyntax"),
            Menus = brackets.getModule("command/Menus"),
            Preferences = require("Preferences"),
            
            initMenu = function () {
                var goMenu = Menus.addMenu("Go", "go.menu", Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
                
                goMenu.addMenuItem(Preferences.GOFMT);
                goMenu.addMenuItem(Preferences.GOIMPORTS);
                goMenu.addMenuItem(Preferences.GOLINT);
                goMenu.addMenuItem(Preferences.GOVET);
                goMenu.addMenuItem(Preferences.GOCODE);
            };
        Preferences.init();
        GoSyntax.init();
        if (Preferences.getPref(Preferences.GOFMT)) {
            GoFormat.init();
        }
        
        initMenu();
    });
});