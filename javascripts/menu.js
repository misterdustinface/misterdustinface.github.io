function openMenu() {
  $("#homebar").slideDown();
}

function closeMenu() {
  $("#homebar").slideUp();
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
  $("#homebar").hide();
  closeMenu();
  isMenuOpen = false;
  $("#homebar").show();
}

function setMenuButtonClickFunction() {
  initMenu();
  $("#menubutton").click(clickMenuButton);
}

$(document).ready(setMenuButtonClickFunction);
