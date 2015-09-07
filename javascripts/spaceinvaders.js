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
    $.getScript("/javascripts/TDD.js", getScriptClosure(runTDD));
    $.getScript("/javascripts/Graphics.js", getScriptClosure(loadGame));
};

var GFX;

var KEYS = {
    W: 87, A: 65, S: 83, D: 68, T:84,
    UP_ARROW: 38, LEFT_ARROW: 37, DOWN_ARROW: 40, RIGHT_ARROW: 39,
    SPACEBAR: 32, ESC: 27,
};

var playerShipUserIntData = {
    shoot:false,
    moveLeft:false,
    moveRight:false,
};

function loadGame() {
    window.addEventListener("keydown", keyDownEventHandler);
    window.addEventListener("keyup",   keyUpEventHandler);
    window.setInterval(update, 1000/60);
    var canvas = document.getElementById("gamecanvas");
    GFX = new Graphics(canvas);
    window.setInterval(draw, 1000/60);
}

function update() {
}

function draw() {
    GFX.clearCanvas();
    GFX.setColor("#FFFFFF");
    GFX.drawRect(20,20,20,20);
    GFX.drawText("TEXT", 50, 50);
    
    GFX.drawTextCentered("Game Running", getWidth()/2, getHeight()/2);
    var isShooting = playerShipUserIntData.shoot;
    if (isShooting) {
        GFX.drawTextCentered("Shooting", getWidth()/2, getHeight()/2 + 60);
    }
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
    if (e.keyCode == KEYS.T) {
        runTDD();
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
}

function runTDD() {
    var x = new TDD();
    x.setResultsCallback(function(xResultsString) {
        window.alert(xResultsString);
    });
    
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
