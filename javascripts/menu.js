function openMenu() {
  // $("#homebar").slideDown();
  // $("#footer").slideDown();
  $("#homebar").show();
  $("#footer").show();
}

function closeMenu() {
  // $("#homebar").slideUp();
  // $("#footer").slideUp();
  $("#homebar").hide();
  $("#footer").hide();
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
