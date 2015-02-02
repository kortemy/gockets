/*global define,brackets,console*/
define(function (require, exports, module) {
    'use strict';
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        StateManager = PreferencesManager.stateManager.getPrefixedSystem("gockets"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Preferences = {
            GOIMPORTS: "pref.goimports",
            GOFMT: "pref.gofmt",
            GOVET: "pref.govet",
            GOLINT: "pref.golint",
            GOCODE: "pref.gocode"
        },
        Labels = {
            GOIMPORTS: "goimports - gofmt + fix imports",
            GOFMT: "gofmt - formats your code",
            GOVET: "govet - code analysis",
            GOLINT: "govet - code style checker",
            GOCODE: "gocode - code hints and autocomplete"
        },
        Commands = {
            //placeholder
        },
        getPref = function (code) {
            return StateManager.get(code);
        },
        setPref = function (code, value) {
            return StateManager.set(code, value);
        },
        changePref = function (code) {
            var value = getPref(code);
            Commands[code].setChecked(!value);
            setPref(code, !value);
        },
        Callbacks = {
            GOIMPORTS: function () {
                changePref(Preferences.GOIMPORTS);
                changePref(Preferences.GOFMT);
            },
            GOFMT: function () {
                changePref(Preferences.GOIMPORTS);
                changePref(Preferences.GOFMT);
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
            StateManager.definePreference(Preferences.GOIMPORTS, "boolean", false);
            Commands[Preferences.GOIMPORTS] = CommandManager.register(Labels.GOIMPORTS,
                                                                      Preferences.GOIMPORTS,
                                                                      Callbacks.GOIMPORTS);
            Commands[Preferences.GOIMPORTS].setChecked(false);
            StateManager.definePreference(Preferences.GOFMT, "boolean", true);
            Commands[Preferences.GOFMT] = CommandManager.register(Labels.GOFMT,
                                                                  Preferences.GOFMT,
                                                                  Callbacks.GOFMT);
            Commands[Preferences.GOFMT].setChecked(true);
            StateManager.definePreference(Preferences.GOVET, "boolean", true);
            Commands[Preferences.GOVET] = CommandManager.register(Labels.GOVET,
                                                                  Preferences.GOVET,
                                                                  Callbacks.GOVET);
            Commands[Preferences.GOVET].setChecked(true);
            StateManager.definePreference(Preferences.GOLINT, "boolean", true);
            Commands[Preferences.GOLINT] = CommandManager.register(Labels.GOLINT,
                                                                   Preferences.GOLINT,
                                                                   Callbacks.GOLINT);
            Commands[Preferences.GOLINT].setChecked(true);
            StateManager.definePreference(Preferences.GOCODE, "boolean", true);
            Commands[Preferences.GOCODE] = CommandManager.register(Labels.GOCODE,
                                                                   Preferences.GOCODE,
                                                                   Callbacks.GOCODE);
            Commands[Preferences.GOCODE].setChecked(true);
        },
        getPref: function (code) {
            return getPref(code);
        },
        setPref: function (code, value) {
            return setPref(code, value);
        }
    };

});