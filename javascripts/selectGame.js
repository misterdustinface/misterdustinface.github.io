function newLoadGameClosure(xLink) {
  var link = xLink;
  return function() {
    var scriptTag = string.concat("<script type=", "'", "text/javascript", "'", " src=", "'", link, "'", ">", "</script>");
    $("#game").html(scriptTag);
  };
}

function makeButton(xText, xLink){
  var buttonElement = string.concat("<div", " class=", "'", "menubutton", "'", " id=", "'", xText, "'", ">", xText, "</div>");
  $("#gameselector").append(buttonElement);
  var elementID = string.concat("#", xText);
  var loadGame = newLoadGameClosure(xLink);
  $(elementID).click(loadGame);
}

function setSelectorButtons() {
  makeButton('Pong', '/javascripts/pong.js');
  makeButton('Space Invaders', '/javascripts/spaceinvaders.js');
}

$(document).ready(setSelectorButtons);
