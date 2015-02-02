/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        StateManager = PreferencesManager.stateManager.getPrefixedSystem("gockets"),
        CommandManager = brackets.getModule("command/CommandManager"),
        KBManager = brackets.getModule("command/KeyBindingManager"),
        Preferences = {
            GOIMPORTS: "pref.goimports",
            GOFMT: "pref.gofmt",
            GOVET: "pref.govet",
            GOLINT: "pref.golint",
            GOCODE: "pref.gocode"
        },
        Labels = {
            GOIMPORTS: "Enable goimports, gofmt + fix imports",
            GOFMT: "Enable gofmt, formats your code",
            GOVET: "Enable govet, code analysis",
            GOLINT: "Enable golint, code style checker",
            GOCODE: "Enable gocode, code hints and autocomplete"
        },
        GoCommands = {
            GOIMPORTS: "go.goimports",
            GOFMT: "go.gofmt",
            GOVET: "go.govet",
            GOLINT: "go.golint",
            GOCODE: "go.gocode"
        },
        PrefCommands = {
            //placeholder
        },
        getPref = function (code) {
            return StateManager.get(code);
        },
        setPref = function (code, value) {
            PrefCommands[code].setChecked(value);
            return StateManager.set(code, value);
        },
        changePref = function (code) {
            var value = getPref(code);
            setPref(code, !value);
            return !value;
        },
        Callbacks = {
            GOIMPORTS: function () {
                KBManager.removeBinding("Ctrl-Alt-F");
                var value = getPref(Preferences.GOIMPORTS);
                setPref(Preferences.GOIMPORTS, !value);
                PrefCommands[Preferences.GOIMPORTS].setChecked(!value);
                CommandManager.get(GoCommands.GOIMPORTS).setEnabled(!value);
                if (!value) {
                    KBManager.addBinding(GoCommands.GOIMPORTS, "Ctrl-Alt-F");
                    setPref(Preferences.GOFMT, value);
                    PrefCommands[Preferences.GOFMT].setChecked(value);
                    CommandManager.get(GoCommands.GOFMT).setEnabled(value);
                }
            },
            GOFMT: function (disable) {
                KBManager.removeBinding("Ctrl-Alt-F");
                var value = getPref(Preferences.GOFMT);
                setPref(Preferences.GOFMT, !value);
                PrefCommands[Preferences.GOFMT].setChecked(!value);
                CommandManager.get(GoCommands.GOFMT).setEnabled(!value);
                if (!value) {
                    KBManager.addBinding(GoCommands.GOFMT, "Ctrl-Alt-F");
                    setPref(Preferences.GOIMPORTS, value);
                    PrefCommands[Preferences.GOIMPORTS].setChecked(value);
                    CommandManager.get(GoCommands.GOIMPORTS).setEnabled(value);
                }
            },
            GOVET: function () {
                changePref(Preferences.GOVET);
            },
            GOLINT: function () {
                changePref(Preferences.GOLINT);
            },
            GOCODE: function () {
                changePref(Preferences.GOCODE);
            }
        };
    return {
        GOIMPORTS: Preferences.GOIMPORTS,
        GOFMT: Preferences.GOFMT,
        GOVET: Preferences.GOVET,
        GOLINT: Preferences.GOLINT,
        GOCODE: Preferences.GOCODE,
        init: function () {
            StateManager.definePreference(Preferences.GOIMPORTS, "boolean", true);
            PrefCommands[Preferences.GOIMPORTS] = CommandManager.register(Labels.GOIMPORTS,
                                                                      Preferences.GOIMPORTS,
                                                                      Callbacks.GOIMPORTS);
            PrefCommands[Preferences.GOIMPORTS].setChecked(true);
            CommandManager.get(GoCommands.GOIMPORTS).setEnabled(true);
            KBManager.addBinding(GoCommands.GOIMPORTS, "Ctrl-Alt-F");
            
            StateManager.definePreference(Preferences.GOFMT, "boolean", false);
            PrefCommands[Preferences.GOFMT] = CommandManager.register(Labels.GOFMT,
                                                                  Preferences.GOFMT,
                                                                  Callbacks.GOFMT);
            PrefCommands[Preferences.GOFMT].setChecked(false);
            CommandManager.get(GoCommands.GOFMT).setEnabled(false);
            StateManager.definePreference(Preferences.GOVET, "boolean", true);
            PrefCommands[Preferences.GOVET] = CommandManager.register(Labels.GOVET,
                                                                  Preferences.GOVET,
                                                                  Callbacks.GOVET);
            PrefCommands[Preferences.GOVET].setChecked(true);
            
            StateManager.definePreference(Preferences.GOLINT, "boolean", true);
            PrefCommands[Preferences.GOLINT] = CommandManager.register(Labels.GOLINT,
                                                                   Preferences.GOLINT,
                                                                   Callbacks.GOLINT);
            PrefCommands[Preferences.GOLINT].setChecked(true);
            
            StateManager.definePreference(Preferences.GOCODE, "boolean", true);
            PrefCommands[Preferences.GOCODE] = CommandManager.register(Labels.GOCODE,
                                                                   Preferences.GOCODE,
                                                                   Callbacks.GOCODE);
            PrefCommands[Preferences.GOCODE].setChecked(true);
        },
        getPref: function (code) {
            return getPref(code);
        },
        setPref: function (code, value) {
            return setPref(code, value);
        }
    };

});