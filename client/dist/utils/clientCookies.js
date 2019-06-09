"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookie: function (cookieName, cookieValue, nDays) {
        var today = new Date();
        var expire = new Date();
        if (nDays == undefined || nDays == 0)
            nDays = 1;
        expire.setTime(today.getTime() + 3600000 * 24 * nDays);
        document.cookie = cookieName + "=" + escape(cookieValue)
            + ";expires=" + expire.toUTCString();
    }
};
//# sourceMappingURL=clientCookies.js.map