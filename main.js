/*global define*/
/*global brackets*/
define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule("utils/AppInit");

    AppInit.appReady(function () {
        var GoFormat = require("tools/GoFormat"),
            GoSyntax = require("tools/GoSyntax"),
            GoImports = require("tools/GoImports"),
            Menus = brackets.getModule("command/Menus"),
            Preferences = require("Preferences"),
            GoMenu = Menus.addMenu("Go", "go.menu", Menus.BEFORE, Menus.AppMenuBar.HELP_MENU),
            ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
            NodeDomain = brackets.getModule("utils/NodeDomain"),
            GoDomain = new NodeDomain("go", ExtensionUtils.getModulePath(module, "node/GoDomain")),
            initMenu = function () {
                GoMenu.addMenuDivider();
                GoMenu.addMenuItem(Preferences.GOFMT);
                GoMenu.addMenuItem(Preferences.GOIMPORTS);
                GoMenu.addMenuItem(Preferences.GOLINT);
                GoMenu.addMenuItem(Preferences.GOVET);
                GoMenu.addMenuItem(Preferences.GOCODE);
            };
        
        GoSyntax.init();
        GoFormat.init(GoDomain, GoMenu);
        GoImports.init(GoDomain, GoMenu);
        Preferences.init();
        initMenu();
    });
});