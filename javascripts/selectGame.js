var lastClickedName;
var lastClickedID;

function select(xName) {
  if (lastClickedName !== xName) {
    var currentID = '#' + xName
    $(currentID).html('[' + xName + ']');
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
  var buttonElement = '<li id=' + '"' + xText + '"' + '>' + xText + '</li>';
  $("#selector-button-list").append(buttonElement);
  var elementID = '#' + xText;
  var loadGame = newLoadGameClosure(xText, xLink);
  $(elementID).click(loadGame);
}

function init() {
  $("#gameselector").append('<h4><ul class="game-nav" id="selector-button-list"></ul></h4>');
}

function setSelectorButtons() {
  init();
  makeButton('Ping', '/javascripts/pong.js');
  makeButton('Invaders', '/javascripts/spaceinvaders.js');
  //select('Ping');
}

$(document).ready(setSelectorButtons);
