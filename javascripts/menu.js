function openMenu() {
  $("#homebar").slideDown();
  $("#footer").slideDown();
  $("#gamecanvas").slideDown();
}

function closeMenu() {
  $("#homebar").slideUp();
  $("#footer").slideUp();
  $("#gamecanvas").slideDown();
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
  openMenu();
  isMenuOpen = true;
}

function setMenuButtonClickFunction() {
  initMenu();
  $("#menubutton").click(clickMenuButton);
}

$(document).ready(setMenuButtonClickFunction);
