function openMenu() {
  $("#homebar").slideDown();
  $("#footer").slideUp();
}

function closeMenu() {
  $("#homebar").slideUp();
  $("#footer").slideDown();
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

function initMenu() {
  closeMenu();
  isMenuOpen = false;
  //clickMenuButton();
}

function setMenuButtonClickFunction() {
  initMenu();
  $("#menubutton").click(clickMenuButton);
}

$(document).ready(setMenuButtonClickFunction);
