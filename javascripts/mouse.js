window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.onload = function() {
  window.addEventListener("keydown", keyDownEventHandler);
  window.addEventListener("keyup",   keyUpEventHandler);
  window.focus();
};
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";

var FPS = 60;
setInterval(draw, 1000/FPS)

var Mouse = {
  x: canvas.width/2,
  y: canvas.height/2,
};

canvas.onmousemove = function(event) {	
  Mouse.x = event.clientX;
  Mouse.y = event.clientY;
};

canvas.onmousedown = function() {
};

canvas.onmouseup = function() {
};

function draw() {
  clearCanvas();
  drawCursor();
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawCursor() {
  ctx.fillStyle = "#FFFFFF";
  drawCircle(Mouse.x, Mouse.y, 3);
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI, false);
  ctx.fill();
}
