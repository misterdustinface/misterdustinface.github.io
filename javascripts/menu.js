var openMenu = function() {
  $('.X').animate({
    left: "0px";
  }, 200);
  
  $('#homebar').animate({
    top: "0px";
  }, 200);

  $('body').animate({
    top: "285px";
  }, 200);
};

var closeMenu = function() {
  $('.X').animate({
    left: "200px";
  }, 200);
  
  $('#homebar').animate({
    top: "-285px";
  }, 200);

  $('body').animate({
    top: "0px";
  }, 200);
};

var isMenuOpen;
var clickMenuButton = function() {
  alert( "Handler for .click() called." );
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
};

var setMenuButtonClickFunction = function() {
  alert("running");

  isMenuOpen = false;
  clickMenuButton();
  $('#menubutton').click(clickMenuButton);
  
  alert("completed");
};

$(document).ready(setMenuButtonClickFunction);
