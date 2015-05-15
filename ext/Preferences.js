/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        StateManager = PreferencesManager.stateManager.getPrefixedSystem("gockets"),
        CommandManager = brackets.getModule("command/CommandManager"),
        KBManager = brackets.getModule("command/KeyBindingManager"),
        GoMenu,
        GOIMPORTS,
        GOFMT,
        GOVET,
        GOLINT,
        GOCODE,
        Labels = {
            GOIMPORTS: "Enable goimports, gofmt + fix imports",
            GOFMT: "Enable gofmt, formats your code",
            GOVET: "Enable govet, code analysis",
            GOLINT: "Enable golint, code style checker",
            GOCODE: "Enable gocode, code hints and autocomplete"
        },
        getPref = function (code) {
            return StateManager.get(code);
        },
        setPref = function (tool, value) {
            var pref = CommandManager.get(tool.pref),
                cmd = CommandManager.get(tool.cmd);
            if (pref) {
                pref.setChecked(value);
            }
            if (cmd) {
                cmd.setEnabled(value);
            }
            StateManager.set(tool.pref, value);
        };
    GOIMPORTS = {
        pref: "pref.goimports",
        cmd: "go.goimports",
        keybind: "Ctrl-Alt-F",
        init: function () {
            StateManager.definePreference(GOIMPORTS.pref, "boolean", true);
            CommandManager.register(Labels.GOIMPORTS, GOIMPORTS.pref, GOIMPORTS.toggle);
            GoMenu.addMenuItem(GOIMPORTS.pref);
            if (StateManager.get(GOIMPORTS.pref)) {
                GOIMPORTS.enable();
            }
        },
        enable: function () {
            GOFMT.disable();
            KBManager.addBinding(GOIMPORTS.cmd, GOIMPORTS.keybind);
            setPref(GOIMPORTS, true);
        },
        disable: function () {
            KBManager.removeBinding(GOIMPORTS.keybind);
            setPref(GOIMPORTS, false);
        },
        toggle: function () {
            if (StateManager.get(GOIMPORTS.pref)) {
                GOIMPORTS.disable();
            } else {
                GOIMPORTS.enable();
            }
        }
    };
    GOFMT = {
        pref: "pref.gofmt",
        cmd: "go.gofmt",
        keybind: "Ctrl-Alt-F",
        init: function () {
            StateManager.definePreference(GOFMT.pref, "boolean", true);
            CommandManager.register(Labels.GOFMT, GOFMT.pref, GOFMT.toggle);
            GoMenu.addMenuItem(GOFMT.pref);
            GOIMPORTS.init(); // needed because they are mutualy exclusive
            if (StateManager.get(GOFMT.pref)) {
                GOFMT.enable();
            }
        },
        enable: function () {
            GOIMPORTS.disable();
            KBManager.addBinding(GOFMT.cmd, GOFMT.keybind);
            setPref(GOFMT, true);
        },
        disable: function () {
            KBManager.removeBinding(GOFMT.keybind);
            setPref(GOFMT, false);
        },
        toggle: function () {
            if (StateManager.get(GOFMT.pref)) {
                GOFMT.disable();
            } else {
                GOFMT.enable();
            }
        }
    };
    GOLINT = {
        pref: "pref.golint",
        cmd: "go.golint",
        init: function () {
            StateManager.definePreference(GOLINT.pref, "boolean", true);
            CommandManager.register(Labels.GOLINT, GOLINT.pref, GOLINT.toggle);
            GoMenu.addMenuItem(GOLINT.pref);
            if (StateManager.get(GOLINT.pref)) {
                GOLINT.enable();
            }
        },
        enable: function () {
            setPref(GOLINT, true);
        },
        disable: function () {
            setPref(GOLINT, false);
        },
        toggle: function () {
            if (StateManager.get(GOLINT.pref)) {
                GOLINT.disable();
            } else {
                GOLINT.enable();
            }
        }
    };
    return {
        GOIMPORTS: GOIMPORTS,
        GOFMT: GOFMT,
        GOVET: GOVET,
        GOLINT: GOLINT,
        GOCODE: GOCODE,
        init: function (menu) {
            GoMenu = menu;
            GOFMT.init();
            GOLINT.init();
        },
        getPref: function (code) {
            return getPref(code);
        }
    };

});