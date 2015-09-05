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

var playerShipUserIntData = {
    shoot:false,
    moveLeft:false,
    moveRight:false,
};

function update() {
}

function draw() {
    clearCanvas();
}

function keyDownEventHandler(e) {
    if (e.keyCode == KEYS.SPACEBAR) {
        playerShipUserIntData.shoot = true;
    }
    if (e.keyCode == KEYS.LEFT_ARROW) {
        playerShipUserIntData.moveLeft = true;
    }
    if (e.keyCode == KEYS.RIGHT_ARROW) {
        playerShipUserIntData.moveRight = true;
    }
}

function keyUpEventHandler(e) {
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
}

function drawRect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
}

function setColor(c) {
    ctx.fillStyle = c
}

function drawText(text, xPos, yPos) {
    ctx.fillText(xText, xPos, yPos);
}

function drawTextCentered(text, xPos, yPos) {
    var length = ctx.measureText(text).width;
    drawText(text, xPos - (length/2), yPos);
}
