function emptyFunction() {
    
}

function getScriptClosure(xFunc) {
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
    $.getScript("/javascripts/Graphics.js", getScriptClosure(loadGraphics));
    $.getScript("/javascripts/TDD.js", getScriptClosure(emptyFunction));
    loadGame();
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
}

function GAME_UPDATE() {
    
}

function GAME_DRAW() {
    GFX.setColor("#FFFFFF");
    GFX.drawRect(20,20,20,20);
    GFX.drawText("TEXT", 50, 50);
    GFX.drawTextCentered("TEXT", 50, 100)
    
    GFX.drawTextCentered("Game Running", GFX.getWidth()/2, GFX.getHeight()/2);
    var isShooting = playerShipUserIntData.shoot;
    if (isShooting) {
        GFX.drawTextCentered("Shooting", GFX.getWidth()/2, GFX.getHeight()/2 + 60);
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
