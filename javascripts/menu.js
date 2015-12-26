function openMenu() {
  $("#homebar").slideDown();
  $("#footer").show();
  $('#menubutton').html('menu ^');
}

function closeMenu() {
  $("#homebar").slideUp();
  $("#footer").hide();
  $('#menubutton').html('menu v');
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
