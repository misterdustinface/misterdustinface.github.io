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

var testdata = {
    failures:[],
    passes:0,
    numTests:0,
};

var TESTS = [test_example];

function runTests() {
    testdata.numTests = TESTS.length
    for (var i = 0; i < TESTS.length; i++) {
        runTest(TESTS[i]);
    }
    
    var results = "Passed:  " + testdata.passes + "/" + testdata.numTests + "\n"
    if (testdata.passes === testdata.numTests) {
        window.confirm(results);
    } else {
        var results = results + "Failed:  \n";
        for (var i = 0; i < testdata.failures.length; i++) {
            results = results + testdata.failures[i] + "\n" ;
        }
        window.alert(results);
    }
}

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
function test_example() {
    window.confirm("Example Test");
    expectEQ(0, 0, "0 == 0")
}

<!-- TEST LIBRARY -->
var testresult = {
    passed:0,
    failures:[],
    evaluations:0,
}

function runTest(xTest) {
    testresult.passed = 0;
    testresult.failures = [];
    xTest();
    
    testdata.numTests = testdata.numTests + 1;
    if (testresult.failures.length > 0) {
        for (var i = 0; i < testresult.failures.length; i++) {
            testdata.failures.push(testresult.failures[i]);   
        }
    } else {
        testdata.passes = testdata.passes + 1;
    }
}

function expectEQ(xExpected, xReceived, xLabel) {
    var result = (xExpected === xReceived);
    if (result) {
        testresult.passed = testresult.passed + 1;
    } else {
        testresult.failures.push(xLabel);
    }
    testresult.evaluations = testresult.evaluations + 1;
}

<!-- GRAPHICS LIBRARY -->
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(c) {
    ctx.fillStyle = c
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
