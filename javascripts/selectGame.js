var lastClickedName;
var lastClickedID;

function select(xText) {
  if (lastClickedName !== xText) {
    var currentID = '#' + xText
    $(currentID).html('<strong>' + xText + '</strong>');
    restoreOldSelection();
    rememberNewSelection(xText);
  }
}

function restoreOldSelection() {
  if (lastClickedID !== null) {
    $(lastClickedID).html(lastClickedName);
  }
}

function rememberNewSelection(xText) {
  lastClickedName = xText;
  lastClickedID = '#' + lastClickedName;
}

function newLoadGameClosure(xText, xLink) {
  var link = xLink;
  return function() {
    select(xText);
    //var setScriptToLink = '<script type="text/javascript" src=' + '"' + link + '"' + '>' + '</script>';
    //$("#game").html(setScriptToLink);
  };
}

function makeButton(xText, xLink) {
  var buttonElement = '<div class="menubutton" id=' + '"' + xText + '"' + '>' + xText + '</div>';
  $("#gameselector").append(buttonElement);
  var elementID = '#' + xText;
  var loadGame = newLoadGameClosure(xText, xLink);
  $(elementID).click(loadGame);
}

function setSelectorButtons() {
  makeButton('Pong', '/javascripts/pong.js');
  makeButton('Space Invaders', '/javascripts/spaceinvaders.js');
  select('Pong');
}

$(document).ready(setSelectorButtons);
