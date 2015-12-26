function openMenu() {
  $("#homebar").slideDown();
  $("#footer").show();
  $('#menubutton').html('<center>menu &#9650;</center>');
  isMenuOpen = true;
}

function closeMenu() {
  $("#homebar").slideUp();
  $("#footer").hide();
  $('#menubutton').html('<center>menu &#9660;</center>');
  isMenuOpen = false;
}

var isMenuOpen = false;
function clickMenuButton() {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function initMenu() {
  var containsGame = $("#gamecanvas").length;
  var containsPost = $("#selected-post").length > 0;
  if (containsGame || containsPost) {
    closeMenu();
  } else {
    openMenu();
  }
}

function setMenuButtonClickFunction() {
  initMenu();
  $("#menubutton").click(clickMenuButton);
}

$(document).ready(setMenuButtonClickFunction);
