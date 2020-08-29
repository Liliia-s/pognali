'use strict';

(function () {
  var itemsOfMenu = document.querySelectorAll('.main-nav__menu, .main-nav__auth, .main-nav__contacts, .main-nav__social');
  var mainNavAuth = document.querySelector('.main-nav__auth');
  var windowInnerWidth = window.innerWidth;
  var windowInnerClientWidth = document.body.clientWidth;

  Array.prototype.slice.call(itemsOfMenu);

  var hideItemsOfMenu = function () {
    if ((windowInnerWidth < 768) || (windowInnerClientWidth < 768)) {
      itemsOfMenu.forEach(function (item) {
        item.classList.add('display-none');
      });
    } if ((windowInnerWidth > 767) || (windowInnerClientWidth > 767)) {
      mainNavAuth.classList.remove('display-none');
    } if ((windowInnerWidth > 1439) || (windowInnerClientWidth > 1439)) {
      itemsOfMenu.forEach(function (item) {
        item.classList.remove('display-none');
      });
    }
  };

  hideItemsOfMenu();
})();
