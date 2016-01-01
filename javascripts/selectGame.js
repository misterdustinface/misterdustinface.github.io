// function newLoadGameClosure(xLink) {
//   var link = xLink;
//   return function() {
//     var setScriptToLink = '<script type=\"text/javascript\" src=\"' + link + '\"></script>'
//     $("#game").html(setScriptToLink);
//   };
// }

function makeButton(xText, xLink) {
  $("#gameselector").append('"Play"' + xText + '!!!');
  //var buttonElement = '<div class="menubutton" id=' + '\"' + xText, + '\"' + '>' + xText + '</div>';
  //$("#gameselector").append(buttonElement);
  //var elementID = '#' + xText;
  //var loadGame = newLoadGameClosure(xLink);
  //$(elementID).click(loadGame);
}

function setSelectorButtons() {
  makeButton('Pong', '/javascripts/pong.js');
  //makeButton('Space Invaders', '/javascripts/spaceinvaders.js');
  
  //$("#gameselector").html("<strong>games</strong>");
  //$("#gameselector").append("<strong>games2</strong>");
}

$(document).ready(setSelectorButtons);
