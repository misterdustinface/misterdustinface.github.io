function emptyFunction() {
    
}

function getScriptCallbackClosure(xFunc) {
    return function(xResponse, xStatus) {
        if (xStatus !== "success") {
            var statusString = "Status of getScript(" + (xFunc.name) + "): " + xStatus;
            window.alert(statusString);
        } else {
            xFunc();
        }
    };
}

window.onload = function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.focus();
    $.when(
        $.getScript("/javascripts/Graphics.js", getScriptCallbackClosure(loadGraphics)),
        $.getScript("/javascripts/TDD.js",      getScriptCallbackClosure(emptyFunction)),
        $.Deferred(function(xDeferred) { $( xDeferred.resolve ); })
    ).done(loadGame);
};

var GFX;
var UPDATE_FUNC = emptyFunction;
var DRAW_FUNC   = emptyFunction;

function update() {
    UPDATE_FUNC();
}

function draw() {
    GFX.clearCanvas();
    DRAW_FUNC();
}

var CONTEXT_PROFILES = {
    NULL: {UPDATE_FUNC: emptyFunction, DRAW_FUNC: emptyFunction},
    GAME: {UPDATE_FUNC: GAME_UPDATE,   DRAW_FUNC: GAME_DRAW},
    TEST: {UPDATE_FUNC: emptyFunction, DRAW_FUNC: TEST_RESULTS_DRAW},
};

function setContext(xContext) {
    var contextProfile = CONTEXT_PROFILES[xContext];
    UPDATE_FUNC = contextProfile.UPDATE_FUNC;
    DRAW_FUNC   = contextProfile.DRAW_FUNC;
}

var KEYS = {
    W: 87, A: 65, S: 83, D: 68, T:84, P:80,
    UP_ARROW: 38, LEFT_ARROW: 37, DOWN_ARROW: 40, RIGHT_ARROW: 39,
    SPACEBAR: 32, ESC: 27,
};

var playerShipUserIntData = {
    shoot:false,
    moveLeft:false,
    moveRight:false,
};

var playerShip = {        
    xPos:0,
    yPos:0,
    width:20,
    height:20,
    xVel:0,
    xSpeed:0.15,
};

function loadGraphics() {
    var canvas = document.getElementById("gamecanvas");
    GFX = new Graphics(canvas);
}

function loadGame() {
    window.addEventListener("keydown", keyDownEventHandler);
    window.addEventListener("keyup",   keyUpEventHandler);
    window.setInterval(update, 1000/60);
    window.setInterval(draw, 1000/60);
    setContext("GAME");
    setPlayerShipToDefaultPosition();
}

function setPlayerShipToDefaultPosition() {
    playerShip.xPos = (GFX.getWidth()/2);
    playerShip.xPos -= (playerShip.width/2);
    playerShip.yPos = (GFX.getHeight() * 3/4);
    playerShip.yPos -= (playerShip.height/2);
}

function GAME_UPDATE() {
    if (playerShipUserIntData.moveRight ^ playerShipUserIntData.moveLeft) {
        if (playerShipUserIntData.moveRight) {
            playerShip.xVel += playerShip.xSpeed;   
        } else {
            playerShip.xVel -= playerShip.xSpeed;
        }
    } else {
        playerShip.xVel = 0;
    }
    
    playerShip.xPos += playerShip.xVel;
}

function GAME_DRAW() {
    GFX.setColor("#FFFFFF");
    
    drawShip(playerShip);

    GFX.drawTextCentered("Game Running", GFX.getWidth()/2, GFX.getHeight()/2);
    if (playerShipUserIntData.shoot) {
        GFX.drawTextCentered("Shooting", GFX.getWidth()/2, GFX.getHeight() * 5/6);
    }
    if (playerShipUserIntData.moveRight) {
        GFX.drawTextCentered("Moving Right", GFX.getWidth() * 3/4, GFX.getHeight() * 5/6);
    }
    if (playerShipUserIntData.moveLeft) {
        GFX.drawTextCentered("Moving Left", GFX.getWidth() * 1/4, GFX.getHeight() * 5/6);
    }
}

function drawShip(xShip) {
    GFX.drawRect(xShip.xPos, xShip.yPos, xShip.width, xShip.height);
}

var TEST_RESULTS = {};
function TEST_RESULTS_DRAW() {
    var CENTER_X = GFX.getWidth()/2;
    var yPos = 20;
    GFX.setColor("#FFFFFF");
    GFX.drawTextCentered("[TEST RESULTS]", CENTER_X, yPos);
    yPos += 30;
    GFX.drawTextCentered("Passed: " +  TEST_RESULTS.passes + "/" + TEST_RESULTS.numTests, CENTER_X, yPos);
    yPos += 30;
    if (TEST_RESULTS.passes !== TEST_RESULTS.numTests) {
        GFX.drawTextCentered("Failed:", CENTER_X, yPos);
        yPos += 30;
        for (var i = 0; i < TEST_RESULTS.failures.length; i++) {
            GFX.drawTextCentered(TEST_RESULTS.failures[i], CENTER_X, yPos);
            yPos += 30;
        }
    }
}

function keyDownEventHandler(e) {
    if (e.keyCode == KEYS.SPACEBAR) {
        setContext("GAME");
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
    if (e.keyCode == KEYS.SPACEBAR) {
        playerShipUserIntData.shoot = false;
    }
    if (e.keyCode == KEYS.LEFT_ARROW) {
        playerShipUserIntData.moveLeft = false;
    }
    if (e.keyCode == KEYS.RIGHT_ARROW) {
        playerShipUserIntData.moveRight = false;
    }
    if (e.keyCode == KEYS.T) {
        setContext("NULL");
        runTDD();
    }
}

function displayTestResults(xResults) {
    TEST_RESULTS = xResults;
    setContext("TEST");
}

function runTDD() {
    var x = new TDD();
    x.setOnResultsCallback(displayTestResults);
    
    x.test("keyDownEventHandler_expectKeysManipulatePlayerShipUserIntData", function() {
        playerShipUserIntData.shoot = false;
        playerShipUserIntData.moveLeft = false;
        playerShipUserIntData.moveRight = false;
        
        keyDownEventHandler({keyCode:KEYS.SPACEBAR});
        expectEQ(true, playerShipUserIntData.shoot, "shoot should be true");
        
        keyDownEventHandler({keyCode:KEYS.LEFT_ARROW});
        expectEQ(true, playerShipUserIntData.moveLeft, "moveLeft should be true");
        
        keyDownEventHandler({keyCode:KEYS.RIGHT_ARROW});
        expectEQ(true, playerShipUserIntData.moveRight, "moveRight should be true");    
    });
    
    x.test("keyUpEventHandler_expectKeysManipulatePlayerShipUserIntData", function() {
        playerShipUserIntData.shoot = true;
        playerShipUserIntData.moveLeft = true;
        playerShipUserIntData.moveRight = true;
        
        keyUpEventHandler({keyCode:KEYS.SPACEBAR});
        expectEQ(false, playerShipUserIntData.shoot, "shoot should be false");
        
        keyUpEventHandler({keyCode:KEYS.LEFT_ARROW});
        expectEQ(false, playerShipUserIntData.moveLeft, "moveLeft should be false");
        
        keyUpEventHandler({keyCode:KEYS.RIGHT_ARROW});
        expectEQ(false, playerShipUserIntData.moveRight, "moveRight should be false");
    });
    
    x.runTests();
    delete x;    
}
