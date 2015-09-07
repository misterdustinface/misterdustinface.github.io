var TESTS = []

function addTest(xTest) {
    TESTS.push(xTest);
}

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
    if (testsysdata.passes !== testsysdata.numTests) {
        var results = results + "Failed:  \n";
        for (var i = 0; i < testsysdata.failures.length; i++) {
            results = results + testsysdata.failures[i] + "\n" ;
        }
    }
    window.alert(results);
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

function shuffle(xArray) {
    for (var i = (xArray.length - 1); i > 0; i--) {
        var X = Math.floor(Math.random() * i);
        var temp  = xArray[i];
        xArray[i] = xArray[X];
        xArray[X] = temp;
    }
    return xArray;
}
