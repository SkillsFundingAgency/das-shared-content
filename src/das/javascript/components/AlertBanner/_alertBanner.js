function AlertBanner($module, $cookieName) {
    this.$cookieName = $cookieName !== undefined ? $cookieName : 'DevolvedAuthorityBanner';
    this.$dropCookie = true;                      // false disables the Cookie, allowing you to style the banner
    this.$alertDuration = 365;                    // Number of days before the cookie expires, and the banner reappears
    this.$alertName = this.$cookieName;            // Name of our cookie
    this.$alertValue = 'true';                     // Value of cookie
    this.$alertBanner = $module;
    this.$alertBannerParent = this.$alertBanner.parentNode;
    this.$alertBannerContinue = this.$alertBanner.querySelector('[data-alert-continue="true"]');
    this.$alertBannerOpen = this.$alertBanner.querySelector('[data-alert-open="true"]');
    this.$alertBannerClose = this.$alertBanner.querySelector('[data-alert-close="true"]');
}

AlertBanner.prototype.init = function () {
    //hide alert notice if already been displayed
    if (this.checkCookie(this.$alertName) == this.$alertValue) {
        this.removeBanner();
    } else {
        this.showBanner();
        if (this.$alertBannerContinue) {
            this.$alertBannerContinue.addEventListener('click', this.removeBannerEvent.bind(this, true));
        }
        if (this.$alertBannerClose) {
            this.$alertBannerClose.addEventListener('click', this.removeBannerEvent.bind(this, false));
        }
        if (this.$alertBannerOpen) {
            this.$alertBannerOpen.addEventListener('click', this.removeBannerEvent.bind(this, false));
        }
    }
}

AlertBanner.prototype.removeBannerEvent = function (redirectToSelection, event) {
    this.createCookie(this.$alertName, this.$alertValue, this.$alertDuration); // Create the cookie

    if(redirectToSelection == false){
        this.removeBanner();
    }
}

AlertBanner.prototype.showBanner = function () {
    if (this.$alertBanner !== null) {
        var bannerClass = this.$alertBanner.getAttribute('class').replace(' visually-hidden', '');
        this.$alertBanner.setAttribute('class', bannerClass);
        var body = document.body;
        body.classList.add("showing-banner");
    }
}

AlertBanner.prototype.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    if (this.$dropCookie) {
        document.cookie = name + "=" + value + expires + "; path=/";
    }
}

AlertBanner.prototype.checkCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

AlertBanner.prototype.removeBanner = function () {
    if (this.$alertBanner !== null) {
        this.$alertBannerParent.removeChild(this.$alertBanner);
        var body = document.body;
        body.classList.remove("showing-banner");
    }
}

export default AlertBanner