window.onload = function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.focus();
    runTests();
    loadGame();
};

var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";

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

function loadGame() {
    window.addEventListener("keydown", keyDownEventHandler);
    window.addEventListener("keyup",   keyUpEventHandler);
    window.setInterval(update, 1000/60);
    window.setInterval(draw, 1000/60);
}

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

<!-- TESTS -->
var TESTS = [
    test_keyDownEventHandler_expectKeysManipulatePlayerShipUserIntData,
];

function test_keyDownEventHandler_expectKeysManipulatePlayerShipUserIntData() {
    playerShipUserIntData.shoot = false;
    playerShipUserIntData.moveLeft = false;
    playerShipUserIntData.moveRight = false;
    
    keyDownEventHandler({keycode:KEYS.SPACEBAR});
    expectEQ(true, playerShipUserIntData.shoot, "shoot should be true");
    
    keyDownEventHandler({keycode:KEYS.LEFT_ARROW});
    expectEQ(true, playerShipUserIntData.moveLeft, "moveLeft should be true");
    
    keyDownEventHandler({keycode:KEYS.RIGHT_ARROW});
    expectEQ(true, playerShipUserIntData.moveRight, "moveRight should be true");
}

<!-- TEST LIBRARY -->
function runTests() {
    var testsysdata = { failures:[], passes:0, numTests:0 };
    shuffleTests();
    for (var i = 0; i < TESTS.length; i++) {
        runTest(TESTS[i], testsysdata);
    }
    displayTestResults(testsysdata);
}

function shuffleTests() {
    shuffle(TESTS);
}

function displayTestResults(testsysdata) {
    var results = "Passed:  " + testsysdata.passes + "/" + testsysdata.numTests + "\n";
    if (testsysdata.passes === testsysdata.numTests) {
        window.confirm(results);
    } else {
        var results = results + "Failed:  \n";
        for (var i = 0; i < testsysdata.failures.length; i++) {
            results = results + testsysdata.failures[i] + "\n" ;
        }
        window.alert(results);
    }
}

var testresult = { passed:0, failures:[] };
function initRunTest() {
    testresult.passed = 0;
    testresult.failures = [];
}

function recordTestResult(testsysdata) {
    testsysdata.numTests = testsysdata.numTests + 1;
    if (testresult.failures.length > 0) {
        for (var i = 0; i < testresult.failures.length; i++) {
            testsysdata.failures.push(testresult.failures[i]);   
        }
    } else {
        testsysdata.passes = testsysdata.passes + 1;
    }
}

function runTest(xTest, testsysdata) {
    initRunTest();
    xTest();
    recordTestResult(testsysdata);
}

function expectEQ(xExpected, xReceived, xLabel) {
    var result = (xExpected === xReceived);
    if (result) {
        testresult.passed = testresult.passed + 1;
    } else {
        testresult.failures.push(xLabel);
    }
}

<!-- GRAPHICS LIBRARY -->
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(c) {
    ctx.fillStyle = c;
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

function drawText(text, xPos, yPos) {
    ctx.fillText(xText, xPos, yPos);
}

function drawTextCentered(text, xPos, yPos) {
    var length = ctx.measureText(text).width;
    drawText(text, xPos - (length/2), yPos);
}

<!-- MISC -->
function shuffle(xArray) {
    for (var i = (xArray.length - 1); i > 0; i--) {
        var X = Math.floor(Math.random() * i);
        var temp  = xArray[i];
        xArray[i] = xArray[X];
        xArray[X] = temp;
    }
    return xArray;
}
