var selected;

function select(xOption) {
  selected = xOption
}

function newLoadGameClosure(xOption, xLink) {
  return function() {
    if (xOption !== selected) {
      var setScriptToLink = '<script type="text/javascript" src=' + '"' + xLink + '"' + '>' + '</script>';
      $("#game").html(setScriptToLink);
      select(xOption);
    }
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
  var hasGame = $('#game').length;
  if (hasGame) {
    init();
    select('Ping');
    makeButton('Ping', '/javascripts/pong.js');
    makeButton('Invaders', '/javascripts/spaceinvaders.js');
  }
}

$(document).ready(setSelectorButtons);
