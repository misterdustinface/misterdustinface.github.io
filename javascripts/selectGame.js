function newLoadGameClosure(xLink) {
  return function() {
    var setScriptToLink = '<script type="text/javascript" src=' + '"' + xLink + '"' + '>' + '</script>';
    $("#game").html(setScriptToLink);
  };
}

function makeButton(xText, xLink) {
  var buttonElement = '<li id=' + '"' + xText + '"' + '>' + xText + '</li>';
  $("#selector-button-list").append(buttonElement);
  var elementID = '#' + xText;
  var loadGame = newLoadGameClosure(xLink);
  $(elementID).click(loadGame);
}

function init() {
  $("#gameselector").append('<div class="homebar"><h4><ul class="game-nav" id="selector-button-list"></ul></h4></div>');
}

function setSelectorButtons() {
  init();
  makeButton('Ping', '/javascripts/pong.js');
  makeButton('Invaders', '/javascripts/spaceinvaders.js');
}

$(document).ready(setSelectorButtons);
