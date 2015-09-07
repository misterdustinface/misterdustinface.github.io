function emptyFunction() {
    
}

function TDD() {
    this.TESTS = [];
    this.onResults = emptyFunction;
}

TDD.prototype.test = function(xTestName, xTest) {
    this.TESTS.push({testname:xTestName, exec:xTest});
}

TDD.prototype.runTests = function() {
    var tests = this.TESTS;
    var testsysdata = { failures:[], passes:0, numTests:0 };
    shuffle(tests);
    for (var i = 0; i < tests.length; i++) {
        testsysdata.testname = tests[i].testname;
        runTest(tests[i].exec, testsysdata);
    }
    this.onResults(testsysdata);
}

TDD.prototype.setOnResultsCallback = function(xCallback) {
    this.onResults = xCallback;
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
        testsysdata.failures.push(TEST_LABEL + testsysdata.testname);
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
