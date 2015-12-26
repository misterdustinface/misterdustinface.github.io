var openMenu = function() {
  $('.homebar').animate({
    top: "0px"
  }, 200);

  $('body').animate({
    top: "285px"
  }, 200);
}

var closeMenu = function() {
  $('.homebar').animate({
    top: "-285px"
  }, 200);

  $('body').animate({
    top: "0px"
  }, 200);
};

var isMenuOpen = true;
var clickMenuButton = function() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
};

var main = function() {
  $('.menubutton').click(clickMenuButton);
};


$(document).ready(main);
