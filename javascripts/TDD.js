function TDD() {
    this.TESTS = [];
    this.resultsCallback = function(xResultsString) {};
}

TDD.prototype.test = function(xTestName, xTest) {
    this.TESTS.push({name:xTestName, exec:xTest});
}

TDD.prototype.runTests = function() {
    var tests = this.TESTS;
    var testsysdata = { failures:[], passes:0, numTests:0 };
    shuffle(tests);
    for (var i = 0; i < tests.length; i++) {
        testsysdata.name = tests[i].name;
        runTest(tests[i].exec, testsysdata);
    }
    displayTestResults(testsysdata);
}

TDD.prototype.setResultsCallback = function(xCallback) {
    this.resultsCallback = xCallback;
}

function displayTestResults(testsysdata) {
    var resultsString = "Passed:  " + testsysdata.passes + "/" + testsysdata.numTests + "\n";
    if (testsysdata.passes !== testsysdata.numTests) {
        var resultsString = resultsString + "Failed:  \n";
        for (var i = 0; i < testsysdata.failures.length; i++) {
            resultsString = resultsString + testsysdata.failures[i] + "\n" ;
        }
    }
    this.resultsCallback(resultsString);
}

var testresult = { passed:0, failures:[] };
function initRunTest() {
    testresult.passed = 0;
    testresult.failures = [];
}

var TEST_LABEL = "[TEST]: "
var FAIL_LABEL = "      > "

function recordTestResult(testsysdata) {
    testsysdata.numTests = testsysdata.numTests + 1;
    if (testresult.failures.length > 0) {
        testsysdata.failures.push(TEST_LABEL + testsysdata.name);
        for (var i = 0; i < testresult.failures.length; i++) {
            testsysdata.failures.push(FAIL_LABEL + testresult.failures[i]);   
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

function shuffle(xArray) {
    for (var i = (xArray.length - 1); i > 0; i--) {
        var X = Math.floor(Math.random() * i);
        var temp  = xArray[i];
        xArray[i] = xArray[X];
        xArray[X] = temp;
    }
    return xArray;
}

function expectEQ(xExpected, xReceived, xLabel) {
    var result = (xExpected === xReceived);
    if (result) {
        testresult.passed = testresult.passed + 1;
    } else {
        testresult.failures.push(xLabel);
    }
}
