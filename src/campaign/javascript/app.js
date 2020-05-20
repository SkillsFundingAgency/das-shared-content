
var headers = document.getElementsByClassName("header"),
    header = headers[0];

window.onscroll = function() { activeHeader() };

function activeHeader() {
  if (header !== undefined) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.classList.add("header--active");
    } else {
      header.classList.remove("header--active");
    }
  }
}

var appInit = function () {

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 && header !== undefined) {
    header.classList.add("header--active");
  }

  var currentDomain = window.location.hostname,
    cookieDomain = getDomain();

  if (currentDomain !== cookieDomain) {
    createCookie(this.$cookieName, '',{days: -1, domain: currentDomain})
    createCookie(this.$AnalyticscookieName, '',{days: -1, domain: currentDomain})
    createCookie(this.$MarketingcookieName, '',{days: -1, domain: currentDomain})
  }

  var topLevelLinks = document.querySelectorAll('.navigation__list-item > a'),
      topLevelLis = document.querySelectorAll('.navigation__list-item');

  for (var li of topLevelLis) {
    var menu = li.querySelector('.navigation__sub-menu');
    if (menu !== null) {
      li.addEventListener('mouseover', function() {
        showMenu(this.querySelector('.navigation__sub-menu'))
      });
      li.addEventListener('mouseout', hideAllMenus);
    }
  }

  for (var link of topLevelLinks) {
    link.addEventListener('focus', hideAllMenus);
    link.addEventListener('keydown', function (e) {
      var key = e.which,
        menu = this.parentNode.querySelector('.navigation__sub-menu');

      if (menu !== null) {
        if (key == 40) {
          hideAllMenus();
          showMenu(menu);
        }
        if (key == 38) {
          hideMenu(menu);
        }
      }
    });
  }

  var selectChangeForm = document.querySelectorAll('.js-select-change-submit');
  for (var selectForm of selectChangeForm) {
    var select = selectForm.querySelector('select');
    select.addEventListener('change', function () {
      selectForm.submit();
    })
  }

  var favouriteButtons = document.querySelectorAll('.das-search-result__favourite-button--unchecked, .das-search-result__favourite-button--checked');
  for (var favButton of favouriteButtons) {
    favButton.addEventListener('click', function () {
      this.classList.add('favourite-button--loading');
    });
  }
}

window.addEventListener('keydown', function(e){
  if((e.key=='Escape'||e.key=='Esc')){
    hideAllMenus();
    e.preventDefault();
    return false;
  }
}, true);

var showMenu = function(menu) {
  menu.classList.add("js-show-menu");
}

var hideMenu = function(menu) {
  menu.classList.remove("js-show-menu");
}

var hideAllMenus = function() {
  var menus = document.querySelectorAll('.navigation__sub-menu');
  for (var menu of menus) {
    hideMenu(menu);
  }
}

function addLoadEvent(func)
{
  var currentOnLoad = window.onload;
  if (typeof window.onload != 'function')
  {
    window.onload = func;
  }
  else
  {
    window.onload = function()
    {
      currentOnLoad();
      func();
    }
  }
}

var getDomain = function () {

  if (window.location.hostname !== 'localhost') {
    if (window.location.hostname.match(/\./g).length > 2) {
      return '.' + window.location.hostname.slice(window.location.hostname.indexOf('.') + 1)
    } else {
      return '.' + window.location.hostname
    }
  } else {
    return window.location.hostname
  }

}

var createCookie = function (name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else var expires = "";
  if (this.$dropCookie) {
    document.cookie = name + "=" + value + expires + "; path=/" + ';SameSite=None;domain=' + this.getDomain()
  }
}

addLoadEvent(appInit);