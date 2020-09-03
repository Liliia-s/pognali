'use strict';

(function () {
  var itemsOfMenu = document.querySelectorAll('.main-nav__menu, .main-nav__auth, .main-nav__contacts, .main-nav__social');
  var menuButton = document.querySelector('.main-nav__toggle');
  // var mainNavAuth = document.querySelector('.main-nav__auth');
  // var windowInnerWidth = window.innerWidth;
  // var windowInnerClientWidth = document.body.clientWidth;
  // var screenWidth = window.screen.width;
  // var windowOuterWidth = window.outerWidth;

  Array.prototype.slice.call(itemsOfMenu);

  // var hideItemsOfMenu = function () {
  itemsOfMenu.forEach(function (item) {
    item.classList.toggle('display-none');
  });
  // };

  // hideItemsOfMenu();

  function menuButtoOnClick() {
    itemsOfMenu.forEach(function (item) {
      item.classList.toggle('display-none');
    });
  }

  menuButton.addEventListener('click', menuButtoOnClick);
})();

// if ((windowInnerWidth < 768) || (windowInnerClientWidth < 768)) {
