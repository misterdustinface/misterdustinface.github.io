function openMenu() {
  $("#menubutton").animate({
    left: "0px"
  }, 200);
  
  $("#homebar").animate({
    top: "0px"
  }, 200);

  // $('body').animate({
  //   top: "285px"
  // }, 200);
}

function closeMenu() {
  $("#homebar").slideUp();
  
  $("#menubutton").animate({
    left: "200px"
  }, 200);
  
  // $('body').animate({
  //   top: "0px"
  // }, 200);
}

var isMenuOpen = false;
function clickMenuButton() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

function setMenuButtonClickFunction() {
  isMenuOpen = false;
  clickMenuButton();
  $("#menubutton").click(clickMenuButton);
}

$(document).ready(setMenuButtonClickFunction);
