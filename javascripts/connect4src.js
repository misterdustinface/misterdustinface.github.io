
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.onload = function(){
	window.addEventListener("keydown", keyDownEventHandler);
	window.addEventListener("keyup",   keyUpEventHandler);
	window.focus();
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";
var UPS = 60;
var FPS = 30;
setInterval(update, 1000/UPS);
setInterval(draw, 1000/FPS)

var COLORS = [	"#FFFFFF", 
		"#77C621", "#21C6A3", "#C621AC", "#C62721",
		"#00FF66", "#0066FF", "#FF0066", "#FF6600", 
		"#000000"];
var TEXTCOLOR = "#CCCCCC"; //"#777"

var MESSAGE_YPOS = 30

//////////////////////////////////////////////////////////////////////////
function update(){}

function draw(){
	clearCanvas();
	drawTextInfo();
	drawMouse();
}
function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

var PROMPT_GAME_START_TEXT = "PRESS [SPACE]";
var PROMPT_GAME_START_TEXT_LENGTH = ctx.measureText(PROMPT_GAME_START_TEXT).width;
function drawTextInfo() {
  ctx.beginPath();
	ctx.fillStyle = TEXTCOLOR;
	ctx.fillText(PROMPT_GAME_START_TEXT, canvas.width/2 - (PROMPT_GAME_START_TEXT_LENGTH/2), MESSAGE_YPOS);
}

function drawMouse() {
	ctx.fillStyle = COLORS[1];
	ctx.beginPath();
	ctx.arc(Mouse.x, Mouse.y, 2, 0, 2*Math.PI, false);
	ctx.fill();
}
///////////////////////////////////////////////////////////////////
var KEYS = {
	W: 87, A: 65, S: 83, D: 68,
	UP_ARROW: 38, LEFT_ARROW: 37, DOWN_ARROW: 40, RIGHT_ARROW: 39,
	SPACEBAR: 32, ESC: 27,
};
function keyDownEventHandler(e){
	if(e.keyCode == KEYS.ESC)
		resetGame();
}

function keyUpEventHandler(e){
}

// MOUSE	
var Mouse = {
  x: canvas.width/2,
 	y: canvas.height/2,
 };
 canvas.onmousemove = function(event){	
 	Mouse.x = event.clientX;
 	Mouse.y = event.clientY;
 };
 canvas.onmousedown = function(){
 };
 canvas.onmouseup = function(){
 };

///////////////////////////////////////////////////////////////////
// function Point() {
// 	this.x = 0;
// 	this.y = 0;
// 	this.intersectsRectangle = function(rectangle) {
// 		return 	this.x >= rectangle.x && this.x <= rectangle.x + rectangle.width
// 		&& 	this.y >= rectangle.y && this.y <= rectangle.y + rectangle.height;
// 	};
// }

function Rectangle() {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
}

function Circle() {
	this.x = 0;
	this.y = 0;
	this.radius = 0;
	this.intersectsRectangle = function(rectangle) {
		return 	this.x + this.radius >= rectangle.x
		&&	this.x - this.radius <= rectangle.x + rectangle.width
		&&	this.y + this.radius >= rectangle.y
		&&	this.y - this.radius <= rectangle.y + rectangle.height;
	};
	this.intersectsCircle = function(other) {
		//distance formula between centers <= sum of two radii
	};
}

function TokenObject(owner) {
  this.circle = new Circle();
  this.circle.radius = 16;
  this.owner = owner;
  this.colorindex = 0;
}

function resetGame() {
}