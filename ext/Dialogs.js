/*global define*/
/*global brackets*/
define(function (require, exports, module) {
    'use strict';

    var Dialogs = brackets.getModule("widgets/Dialogs"),
        buildErrorDialog = function (cmd, data) {
            var className = "go-error-dialog",
                title = "Error!",
                message = "Got message: <br/>" + JSON.stringify(data) + "<br/><br/>" + cmd + " tool not installed?";
            Dialogs.showModalDialog(className, title, message);
        };

    return {
        showError: function (cmd, data) {
            buildErrorDialog(cmd, data);
        }
    };
});