window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

window.onload = function() {
    window.addEventListener("keydown", keyDownEventHandler);
    window.addEventListener("keyup",   keyUpEventHandler);
    window.focus();
};

var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";

var UPS = 60;
var FPS = 60;

setInterval(update, 1000/UPS);
setInterval(draw, 1000/FPS);

var KEYS = {
    W: 87, A: 65, S: 83, D: 68,
    UP_ARROW: 38, LEFT_ARROW: 37, DOWN_ARROW: 40, RIGHT_ARROW: 39,
    SPACEBAR: 32, ESC: 27,
};

function update() {
}

function draw() {
}

function keyDownEventHandler(e) {
    if (e.keyCode == KEYS.SPACEBAR) {
    }
}

function keyUpEventHandler(e) {
}
