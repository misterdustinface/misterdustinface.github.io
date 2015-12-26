function openMenu() {
  $("#menubutton").animate({
    left: "0px";
  }, 200);
  
  $("#homebar").animate({
    top: "0px";
  }, 200);

  // $('body').animate({
  //   top: "285px";
  // }, 200);
}

function closeMenu() {
  $("#menubutton").animate({
    left: "200px";
  }, 200);
  
  $("#homebar").slideUp();

  // $('body').animate({
  //   top: "0px";
  // }, 200);
}

var isMenuOpen;
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
