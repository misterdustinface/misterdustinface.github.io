var GRAPHICS_LIB_FILE_PATH = "/javascripts/Graphics.js";
var TDD_LIB_FILE_PATH      = "/javascripts/TDD.js";

function emptyFunction() {
    
}

function getScriptCallbackClosure(xScriptFilePath, xCallback) {
    return function(xResponse, xStatus) {
        if (xStatus !== "success") {
            var statusString = "Status of getScript(" + xScriptFilePath + "): " + xStatus;
            window.alert(statusString);
        } else {
            xCallback();
        }
    };
}

window.onload = function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.focus();
    $.when(
        $.getScript(GRAPHICS_LIB_FILE_PATH, getScriptCallbackClosure(GRAPHICS_LIB_FILE_PATH, loadGraphics)),
        $.getScript(TDD_LIB_FILE_PATH,      getScriptCallbackClosure(TDD_LIB_FILE_PATH,      emptyFunction)),
        $.Deferred(function(xDeferred) { $( xDeferred.resolve ); })
    ).done(loadGame);
};

var GFX;
var UPDATE_FUNC   = emptyFunction;
var DRAW_FUNC     = emptyFunction;
var KEY_UP_FUNC   = emptyFunction;
var KEY_DOWN_FUNC = emptyFunction;

function update() {
    UPDATE_FUNC();
}

function draw() {
    GFX.clearCanvas();
    DRAW_FUNC();
}

function keyUpEventHandler(e) {
    KEY_UP_FUNC(e.keyCode);
}

function keyDownEventHandler(e) {
    KEY_DOWN_FUNC(e.keyCode);
}

var CONTEXT_PROFILES = {
    NULL: {UPDATE_FUNC: emptyFunction, DRAW_FUNC: emptyFunction,     KEY_UP_FUNC: gameKeyUpEventHandler, KEY_DOWN_FUNC: gameKeyUpEventHandler},
    GAME: {UPDATE_FUNC: GAME_UPDATE,   DRAW_FUNC: GAME_DRAW,         KEY_UP_FUNC: gameKeyUpEventHandler, KEY_DOWN_FUNC: gameKeyDownEventHandler},
    TEST: {UPDATE_FUNC: emptyFunction, DRAW_FUNC: TEST_RESULTS_DRAW, KEY_UP_FUNC: gameKeyUpEventHandler, KEY_DOWN_FUNC: gameKeyDownEventHandler},
};

function setContext(xContext) {
    var contextProfile = CONTEXT_PROFILES[xContext];
    UPDATE_FUNC = contextProfile.UPDATE_FUNC;
    DRAW_FUNC   = contextProfile.DRAW_FUNC;
    KEY_UP_FUNC = contextProfile.KEY_UP_FUNC;
    KEY_DOWN_FUNC = contextProfile.KEY_DOWN_FUNC;
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

var playerShip = {};

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
    initPlayerShip();
}

function initPlayerShip() {
    playerShip.xPos = 0;
    playerShip.yPos = 0;
    playerShip.width = 20;
    playerShip.height = 20;
    playerShip.xVel = 0;
    playerShip.xSpeed = 0.15;
    setPlayerShipToDefaultPosition();
    
    playerShipUserIntData.shoot = false;
    playerShipUserIntData.moveLeft = false;
    playerShipUserIntData.moveRight = false;
}

function setPlayerShipToDefaultPosition() {
    playerShip.xPos = (GFX.getWidth()/2);
    playerShip.xPos -= (playerShip.width/2);
    playerShip.yPos = (GFX.getHeight() * 3/4);
    playerShip.yPos -= (playerShip.height/2);
}

function GAME_UPDATE() {
    updatePlayerShip();
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

function updatePlayerShip() {
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

function gameKeyUpEventHandler(xKeycode) {
    if (xKeycode == KEYS.SPACEBAR) {
        playerShipUserIntData.shoot = false;
    }
    if (xKeycode == KEYS.LEFT_ARROW) {
        playerShipUserIntData.moveLeft = false;
    }
    if (xKeycode == KEYS.RIGHT_ARROW) {
        playerShipUserIntData.moveRight = false;
    }
    if (xKeycode == KEYS.T) {
        setContext("NULL");
        runTDD();
    }
}

function gameKeyDownEventHandler(xKeycode) {
    if (xKeycode == KEYS.SPACEBAR) {
        setContext("GAME");
        playerShipUserIntData.shoot = true;
    }
    if (xKeycode == KEYS.LEFT_ARROW) {
        playerShipUserIntData.moveLeft = true;
    }
    if (xKeycode == KEYS.RIGHT_ARROW) {
        playerShipUserIntData.moveRight = true;
    }
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

function recordAndDisplayTestResults(xResults) {
    TEST_RESULTS = xResults;
    setContext("TEST");
    initPlayerShip();
}

function runTDD() {
    var x = new TDD();
    x.setOnResultsCallback(recordAndDisplayTestResults);
    
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
    
    x.test("moveLeft_expectIncreasesShipVelocityInMinusX", function() {
        playerShip.xVel = 0;
        playerShipUserIntData.moveLeft = true;
        playerShipUserIntData.moveRight = false;
        
        updatePlayerShip();
        expectEQ(-playerShip.xSpeed, playerShip.xVel, "xVel should equal -xSpeed when left is selected");
    });
    
    x.test("moveRight_expectIncreasesShipVelocityInPlusX", function() {
        playerShip.xVel = 0;
        playerShipUserIntData.moveLeft = false;
        playerShipUserIntData.moveRight = true;
        
        updatePlayerShip();
        expectEQ(playerShip.xSpeed, playerShip.xVel, "xVel should equal xSpeed when right is selected");
    });
    
    x.test("moveRight+moveLeft_xVelIsZero_expectShipXVelocityDoesNotChange", function() {
        playerShip.xVel = 0;
        playerShipUserIntData.moveLeft = true;
        playerShipUserIntData.moveRight = true;
        var originalXVel = playerShip.xVel;
        
        updatePlayerShip();
        expectEQ(originalXVel, playerShip.xVel, "xVel should not change when originally zero and left+right are selected");
    });
    
    x.test("moveRight+moveLeft_expectShipXVelocitySetToZero", function() {
        playerShip.xVel = 20;
        playerShipUserIntData.moveLeft = true;
        playerShipUserIntData.moveRight = true;
        
        updatePlayerShip();
        expectEQ(0, playerShip.xVel, "xVel should be set to zero when left+right selected");
    });
    
    x.test("noMovement_expectShipXVelocityIsZero", function() {
        playerShip.xVel = 20;
        playerShipUserIntData.moveLeft = false;
        playerShipUserIntData.moveRight = false;
        
        updatePlayerShip();
        expectEQ(0, playerShip.xVel, "xVel should be set to zero when neither left or right is selected");
    });
    
    x.runTests();
    delete x;    
}
