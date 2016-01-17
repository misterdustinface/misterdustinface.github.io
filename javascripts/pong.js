
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.onload = function() {
	window.addEventListener("keydown", keyDownEventHandler);
	window.addEventListener("keyup", keyUpEventHandler);
	window.addEventListener("touchstart", touchStartEventHandler);
	window.addEventListener("touchmove", touchMoveEventHandler);
	window.addEventListener("touchend", touchEndEventHandler);
	window.focus();
};
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";
var UPS = 60;
var FPS = 60;
setInterval(update, 1000/UPS);
setInterval(draw, 1000/FPS);

var WINNING_SCORE	= 10;
var LEFT_SCORE		= 0;
var RIGHT_SCORE		= 0;
var LEFT_WIN		= false;
var RIGHT_WIN		= false;
var MAX_PADDLE_SPEED	= 6;
var MAX_BALL_XVEL	= 9;
var MIN_BALL_XVEL	= 0.5;
var PADDLE_OFFSET	= 20;
var BALL_SERVE_WITH_PADDLE_OFFSET = 20;
var SCORE_YPOS		= 20;
var MESSAGE_YPOS	= 250;
var BALL_SPEED		= 5;
var PADDLE_SPEED	= 1;
var PADDLE_DIRECTION_TRANSITION_RATE = 1/8;
var WALL_OFFSET         = 8;

var COLORS = [	"#FFFFFF", 
		"#77C621", "#21C6A3", "#C621AC", "#C62721",
		"#00FF66", "#0066FF", "#FF0066", "#FF6600", 
		"#000000"];
var TEXTCOLOR = "#CCCCCC"; //"#777"
var TOUCHCOLOR = "#111111";

var LeftPaddle  = new VerticalPaddleObject(PADDLE_OFFSET);
var RightPaddle = new VerticalPaddleObject(canvas.width - PADDLE_OFFSET);
var PADDLES = [LeftPaddle, RightPaddle];
var TopWall = new HorizontalWallObject(WALL_OFFSET);
var BottomWall = new HorizontalWallObject(canvas.height - WALL_OFFSET);
var WALLS = [TopWall, BottomWall];

var Ball = new BallObject();
//var BALLS = [Ball];

function Touch() {
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.targetID = "";
	this.fingerID = "";
}
var activeTouchesMap = {};

//////////////////////////////////////////////////////////////////////////

function update() {
	updatePaddles();
	updateBalls();
	checkWin();
	if (shouldResetGame()) {
		resetGame();
	}
}

function draw() {
	clearCanvas();
	drawBall();
	for (var i = 0; i < PADDLES.length; i++)
		drawPaddle(PADDLES[i]);
	drawTextInfo();
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
	setColor(COLORS[ (Math.abs(Ball.colorindex) % COLORS.length) ]);
	drawCircle(Ball.x, Ball.y, Ball.radius);
}

function drawPaddle(paddle) {
	setColor(COLORS[ (Math.abs(paddle.colorindex) % COLORS.length) ]);
	drawRect(paddle.x, paddle.y, paddle.width, paddle.height);
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
	ctx.fillStyle = c;
}

var SCOREFIELD_LENGTH = ctx.measureText("XX [Score] XX").width;
var PROMPT_BALL_SERVE_TEXT = "PRESS [SPACE]";
var PROMPT_BALL_SERVE_TEXT_LENGTH = ctx.measureText(PROMPT_BALL_SERVE_TEXT).width;
function drawTextInfo() {
	ctx.fillStyle = TEXTCOLOR;
	ctx.fillText(LEFT_SCORE + " [Score] " + RIGHT_SCORE, canvas.width/2 - (SCOREFIELD_LENGTH/2), SCORE_YPOS);

  	if (RIGHT_WIN ^ LEFT_WIN) {
  		var winnerText = (RIGHT_WIN ? "RIGHT WINS" : "LEFT WINS"); 
  		var length = ctx.measureText(winnerText).width;
		ctx.fillText(winnerText, canvas.width/2 - (length/2), MESSAGE_YPOS);
  	} else if (! Ball.isServed) {
    		ctx.fillText(PROMPT_BALL_SERVE_TEXT, canvas.width/2 - (PROMPT_BALL_SERVE_TEXT_LENGTH/2), MESSAGE_YPOS);
	}
	
	setColor(TOUCHCOLOR);
	var i = 0;
	for (var key in activeTouchesMap) {
		if (activeTouchesMap.hasOwnProperty(key)) {
			var touch = activeTouchesMap[key];
			ctx.fillText("x: " + touch.x + " y: " + touch.y + " dx: " + touch.dx + " dy: " + touch.dy + " target: " + touch.targetID, 10, canvas.height - 10 - (15 * i));
			drawCircle(touch.x, touch.y, 10);
			drawCircle(touch.x + touch.dx, touch.y + touch.dy, 10);
			i = i + 1;
		}
	}

}

///////////////////////////////////////////////////////////////////
var KEYS = {
	W: 87, A: 65, S: 83, D: 68,
	UP_ARROW: 38, LEFT_ARROW: 37, DOWN_ARROW: 40, RIGHT_ARROW: 39,
	SPACEBAR: 32, ESC: 27,
};

function keyDownEventHandler(e) {
	if (e.keyCode == KEYS.SPACEBAR)
		serveBall();
	if (e.keyCode == KEYS.ESC)
		resetGame();
	
	if (e.keyCode == KEYS.W)
		LeftPaddle.up = true;
	if (e.keyCode == KEYS.S)
		LeftPaddle.down = true;
	if (e.keyCode == KEYS.UP_ARROW)
		RightPaddle.up = true;
	if (e.keyCode == KEYS.DOWN_ARROW)
		RightPaddle.down = true;
		
	if (e.keyCode == KEYS.D)
		LeftPaddle.colorindex++; 
	if (e.keyCode == KEYS.A)
		LeftPaddle.colorindex--;
	if (e.keyCode == KEYS.RIGHT_ARROW)
		RightPaddle.colorindex++;
	if (e.keyCode == KEYS.LEFT_ARROW)
		RightPaddle.colorindex--;
		
	//if(e.keyCode == KEYS.D) Ball.radius++;
	//if(e.keyCode == KEYS.A) Ball.radius--;
}

function keyUpEventHandler(e) {

  	if (e.keyCode == KEYS.W)
		LeftPaddle.up = false;
	if (e.keyCode == KEYS.S)
		LeftPaddle.down = false;
	if (e.keyCode == KEYS.UP_ARROW)
		RightPaddle.up = false;
	if (e.keyCode == KEYS.DOWN_ARROW)
		RightPaddle.down = false;
}

function touchStartEventHandler(e) {
    var rect = canvas.getBoundingClientRect();
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        var finger = touches[i];
	var fingerID = finger.identifier;

	var touch = new Touch();
	touch.fingerID = fingerID;

	var targetElement = document.elementFromPoint(finger.clientX, finger.clientY);
	touch.targetID = targetElement.id;

	touch.x = parseInt(finger.clientX) - rect.left;
	touch.y = parseInt(finger.clientY) - rect.top;
	
	activeTouchesMap[fingerID] = touch;

	if (touch.targetID == 'gamecanvas') {
		e.preventDefault();
	}
    }
}

function touchMoveEventHandler(e) {
    var rect = canvas.getBoundingClientRect();
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
    	var finger = touches[i];
	var fingerID = finger.identifier;
	var touch = activeTouchesMap[fingerID];
	
	touch.dx = parseInt(finger.clientX) - rect.left - touch.x;
	touch.dy = parseInt(finger.clientY) - rect.top - touch.y;
	
	if (touch.targetID == 'gamecanvas') {
		e.preventDefault();
	}
    }
}

function touchEndEventHandler(e) {
    var rect = canvas.getBoundingClientRect();
    var touches = event.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        var finger = touches[i];
	var fingerID = finger.identifier;
	var touch = activeTouchesMap[fingerID];

	touch.dx = parseInt(finger.clientX) - rect.left - touch.x;
	touch.dy = parseInt(finger.clientY) - rect.top - touch.y;
	
	activeTouchesMap[fingerID] = null;
	
	if (touch.targetID == 'gamecanvas') {
		e.preventDefault();
	}
    }
}

//////////////////////////////////////////////////////////////////

function HorizontalWallObject(yCenterPos) {
	this.width = canvas.width;
	this.height = 4;
	this.x = 0;
	this.y = yCenterPos - this.width/2;
	this.colorindex = 0;
}

function VerticalPaddleObject(xPos) {
	this.width  = 4;
	this.height = 64;
	this.x = xPos;
	this.y = canvas.height/2 - this.height/2;
	this.yVel = 0;
	this.speed = PADDLE_SPEED;
	this.colorindex = 0;
	this.up    = false;
	this.down  = false;
	this.right = false;
	this.left  = false;
}

function BallObject() {
	this.radius = 4;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xVel = 0;
	this.yVel = 0;
	this.speed = BALL_SPEED;
	this.colorindex = 0;
	this.isServed = false;
}

function intersects (circle, rectangle) {
	return 	circle.x + circle.radius >= rectangle.x && 
      circle.x - circle.radius <= rectangle.x + rectangle.width && 
      circle.y + circle.radius >= rectangle.y &&
      circle.y - circle.radius <= rectangle.y + rectangle.height;
}

//function intersects(point, rectangle) {
//	return 	point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width
//	&& 	point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height;
//}

function updatePaddles() {
	for (var i = 0; i < PADDLES.length; i++) {
		applyControllerCommandToPaddle(PADDLES[i]);
		limitPaddleSpeed(PADDLES[i]);
		keepPaddleInBounds(PADDLES[i]);
    	}
}

function applyControllerCommandToPaddle(paddle) {
	if (paddle.up ^ paddle.down) {
 		if(paddle.up) 	paddle.yVel -= paddle.speed;
 		if(paddle.down)	paddle.yVel += paddle.speed;
 		paddle.y += paddle.yVel; // move y position accordingly
	} else {
  		paddle.yVel *= PADDLE_DIRECTION_TRANSITION_RATE;
  		paddle.y += paddle.yVel; // move y position accordingly
  		//paddle.yVel = 0;
	}
}

function limitPaddleSpeed(paddle) {
  	if (paddle.yVel > MAX_PADDLE_SPEED)
		paddle.yVel = MAX_PADDLE_SPEED;
	if (paddle.yVel < -MAX_PADDLE_SPEED)
		paddle.yVel = -MAX_PADDLE_SPEED;
}

function keepPaddleInBounds(paddle) {
	if (paddle.y + paddle.height < 0)
		paddle.y = canvas.height;
	else if (paddle.y > canvas.height)
		paddle.y = -paddle.height;
}

function serveBall() {
	if (! Ball.isServed) {
		
		Ball.xVel = Math.random() * Ball.speed + MIN_BALL_XVEL;
		
		if (shouldBallFollowLeftPaddle() ^ shouldBallFollowRightPaddle()) {
			if (shouldBallFollowLeftPaddle()) {
				Ball.yVel = LeftPaddle.yVel;
			}
			if (shouldBallFollowRightPaddle()) {
				Ball.yVel = RightPaddle.yVel;
				Ball.xVel = -Ball.xVel;
			}
		} else {
			if(Math.random() > 0.5)
				Ball.xVel = -Ball.xVel;
		}
		
		if (Math.abs(Ball.yVel) < 0.01) {
			Ball.yVel = Math.random() * Ball.speed;
			if (Math.random() > 0.5)
				Ball.yVel = -Ball.yVel;
		}
		
		Ball.isServed = true;
	}
}

function updateBalls() {
	if (! Ball.isServed) {
		haveBallFollowLosingPaddle();
	} else {
		Ball.x += Ball.xVel;
		Ball.y += Ball.yVel;
		swatBallIfTouchingPaddle();
		keepBallInBounds();
	}
}

function swatBallIfTouchingPaddle() {
	for (var i = 0; i < PADDLES.length; i++) {
		if (intersects(Ball, PADDLES[i])) {
			swatBall(PADDLES[i]);
		}
	}
}

function haveBallFollowLosingPaddle() {
	if (shouldBallFollowLeftPaddle()) {
		Ball.x = LeftPaddle.x + (LeftPaddle.width + BALL_SERVE_WITH_PADDLE_OFFSET) + Ball.radius;
		Ball.y = LeftPaddle.y + (LeftPaddle.height/2);
		keepBallInBounds();
	} else if (shouldBallFollowRightPaddle()) {
		Ball.x = RightPaddle.x - (BALL_SERVE_WITH_PADDLE_OFFSET) - Ball.radius;
		Ball.y = RightPaddle.y + (RightPaddle.height/2);
		keepBallInBounds();
	}
}

function shouldBallFollowLeftPaddle() {
	return RIGHT_SCORE > LEFT_SCORE && !RIGHT_WIN;
}
function shouldBallFollowRightPaddle() {
	return LEFT_SCORE > RIGHT_SCORE && !LEFT_WIN;
}

function swatBall(paddle) {
	Ball.xVel = -Ball.xVel;
	if ( Ball.xVel < 0 ) {
		Ball.xVel -= Math.random() * Ball.speed;
		if (Ball.xVel < -MAX_BALL_XVEL)
			Ball.xVel = -MAX_BALL_XVEL;
	} else {
		Ball.xVel += Math.random() * Ball.speed;
		if (Ball.xVel > MAX_BALL_XVEL)
			Ball.xVel = MAX_BALL_XVEL;
	}
		
	if ( (paddle.yVel < 0 && Ball.yVel > 0) || (paddle.yVel > 0 && Ball.yVel < 0) )
		Ball.yVel = - Math.abs(Math.abs(paddle.yVel) - Math.abs(Ball.yVel));
	else if (Math.random() > 0.5)
		Ball.yVel = - Math.random() * Ball.speed;
}

function keepBallInBounds() {
	if (Ball.y + Ball.radius > canvas.height) {
		Ball.y = canvas.height - Ball.radius;
		Ball.yVel = -Ball.yVel;
	} else if (Ball.y - Ball.radius < 0) {
		Ball.y = Ball.radius;
		Ball.yVel = -Ball.yVel;
	}
	
	if (Ball.x - Ball.radius > canvas.width) {
		LEFT_SCORE += 1;
		resetBall();
	} else if (Ball.x + Ball.radius < 0) {
		RIGHT_SCORE += 1;
		resetBall();
	}
}

function checkWin() {
	if (RIGHT_SCORE >= WINNING_SCORE) RIGHT_WIN = true;
	if (LEFT_SCORE  >= WINNING_SCORE) LEFT_WIN  = true;
}

function resetBall() {
	delete Ball;
	Ball = new BallObject();
}

function shouldResetGame() {
	return (RIGHT_WIN || LEFT_WIN) && isPlayRequested();
}

function isPlayRequested() {
	return Ball.isServed;
}

function resetGame() {
	resetGameData();
	resetBall();
}

function resetGameData(){
	RIGHT_WIN = false;
	LEFT_WIN = false;
	RIGHT_SCORE = 0;
	LEFT_SCORE = 0;
}
