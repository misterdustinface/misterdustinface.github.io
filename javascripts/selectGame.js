var lastClickedName;
var lastClickedID;

function select(xName) {
  if (lastClickedName !== xName) {
    var currentID = '#' + xName
    $(currentID).html('<strong>' + xName + '</strong>');
    restoreOldSelection();
    rememberNewSelection(xName);
  }
}

function restoreOldSelection() {
  if (lastClickedID !== null) {
    $(lastClickedID).html(lastClickedName);
  }
}

function rememberNewSelection(xName) {
  lastClickedName = xName;
  lastClickedID = '#' + lastClickedName;
}

function newLoadGameClosure(xName, xLink) {
  return function() {
    select(xName);
    var setScriptToLink = '<script type="text/javascript" src=' + '"' + xLink + '"' + '>' + '</script>';
    $("#game").html(setScriptToLink);
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
  makeButton('Ping', '/javascripts/pong.js');
  makeButton('Invaders', '/javascripts/spaceinvaders.js');
  select('Ping');
}

$(document).ready(setSelectorButtons);
