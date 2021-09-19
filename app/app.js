import { Application } from '@nativescript/core';
var application = require("@nativescript/core/application");
var frameModule = require("@nativescript/core/ui/frame");


Application.run({ moduleName: 'app-root' })

if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}
function backEvent(args) {
    var currentPage = frameModule.topmost().currentPage;
    if (currentPage && currentPage.exports && typeof currentPage.exports.backEvent === "function") {
         currentPage.exports.backEvent(args);
   }
}

