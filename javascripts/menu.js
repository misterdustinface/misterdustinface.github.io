function openMenu() {
  $("#homebar").slideDown();
  $("#footer").show();
  $('#menubutton').html('<img src="/images/menu-icon.png" alt="[menu]" style="width:32px;height:32px;"></img><center>menu &#9650;</center>');
}

function closeMenu() {
  $("#homebar").slideUp();
  $("#footer").hide();
  $('#menubutton').html('<img src="/images/menu-icon.png" alt="[menu]" style="width:32px;height:32px;"></img><center>menu &#9660;</center>');
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
