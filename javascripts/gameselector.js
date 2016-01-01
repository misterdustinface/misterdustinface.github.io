

function newSelectGameClosure(xUniqueID, xGameTitle) {
  return function() {
    
  };
}

function loadGame(xGameSrc) {
  $('<script>').attr({
    src: xGameSrc,
    type: 'text/javascript'
  }).appendTo('#game');
}

function makeButton(xGameTitle, xUniqueID) {
  var buttonElement = '<li id=' + '"' + xUniqueID + '"' + '>' + xGameTitle + '</li>';
  $("#selector-button-list").append(buttonElement);
  var elementID = '#' + xUniqueID;
  var selectGame = newSelectGameClosure(xUniqueID, xGameTitle);
  $(elementID).click(selectGame);
}

function init() {
  $("#gameselector").append('<h4><ul class="game-nav" id="selector-button-list"></ul></h4>');
}

function setGameSelections() {
  var hasGame = $('#game').length;
  if (hasGame) {
    init();
    
    var selections = 2;
    var selection = Math.floor((Math.random() * selections) + 1);
    if (selection === 1) {
      loadGame('/javascripts/pong.js');
      makeButton('Ping', 'ping-game-selector');
    } else {
      loadGame('/javascripts/spaceinvaders.js');
      makeButton('Invaders', 'invaders-game-selector');
    }
  }
}

$(document).ready(setGameSelections);
