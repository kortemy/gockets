/*global define*/
/*global brackets*/
define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule("utils/AppInit");

    AppInit.appReady(function () {
        var GoSyntax = require("tools/GoSyntax"),
            GoLint = require("tools/GoLint"),
            GoFormat = require("tools/GoFormat"),
            GoImports = require("tools/GoImports"),
            Menus = brackets.getModule("command/Menus"),
            Preferences = require("ext/Preferences"),
            GoMenu = Menus.addMenu("Go", "go.menu", Menus.BEFORE, Menus.AppMenuBar.HELP_MENU),
            ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
            NodeDomain = brackets.getModule("utils/NodeDomain"),
            GoDomain = new NodeDomain("go", ExtensionUtils.getModulePath(module, "node/GoDomain"));
        
        GoSyntax.init();
        GoLint.init(GoDomain);
        GoFormat.init(GoDomain, GoMenu);
        GoImports.init(GoDomain, GoMenu);
        GoMenu.addMenuDivider();
        Preferences.init(GoMenu);
    });
});