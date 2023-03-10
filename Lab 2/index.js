const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// Mean tests
try {
    // Should pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

// Median squared tests
try {
    // Should pass
    const medianSquaredOne = arrayUtils.medianSquared([43, 23, 101]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed the test case');
}
try {
    // Should fail
    const medianSquaredTwo = arrayUtils.medianSquared(["guitar", 1, 3, "apple"]);
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully');
}

// Max element tests
try {
    // Should pass
    const maxElementOne = arrayUtils.maxElement([134, 267, 222]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed the test case');
}
try {
    // Should fail
    const maxElementTwo = arrayUtils.maxElement([]);
    console.error('maxElement did not error');
} catch (e) {
    console.log('maxElement failed successfully');
}

// Fill tests
try {
    // Should pass
    const fillOne = arrayUtils.fill(27.5, 'hello');
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed the test case');
}
try {
    // Should fail
    const fillTwo = arrayUtils.fill('banana');
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully');
}

// Count repeating tests
try {
    // Should pass
    const countRepeatingOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed the test case');
}
try {
    // Should fail
    const countRepeatingTwo = arrayUtils.countRepeating();
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully');
}

// Is equal tests
try {
    // Should pass
    const isEqualOne = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed the test case');
}
try {
    // Should fail
    const isEqualTwo = arrayUtils.isEqual([1, 2, 3, 4]);
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully');
}

// Camel case tests
try {
    // Should pass
    const camelCaseOne = stringUtils.camelCase("How now brown cow");
    console.log('camelCase passed successfully');
} catch (e) {
    console.error('camelCase failed the test case');
}
try {
    // Should fail
    const camelCaseTwo = stringUtils.camelCase(["Hello", "World"]);
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully');
}

// Replace char tests
try {
    // Should pass
    const replaceCharOne = stringUtils.replaceChar("babbbbble");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed the test case');
}
try {
    // Should fail
    const replaceCharTwo = stringUtils.replaceChar("");
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

// Mash up tests
try {
    // Should pass
    const mashUpOne = stringUtils.mashUp("hello", "world");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed the test case');
}
try {
    // Should fail
    const mashUpTwo = stringUtils.mashUp("h", "e");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

// Make arrays tests
try {
    // Should pass
    const makeArraysOne = objUtils.makeArrays([{x: 2, y: 3}, {a: 70, x: 4, z: 5}, {x: 0, y: 9, q: 10}]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed the test case');
}
try {
    // Should fail
    const makeArraysTwo = objUtils.makeArrays([{x: 2, y: 3}, {}, {x: 0, y: 9, q: 10}]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully');
}

// Is deep equal tests
try {
    // Should pass
    const isDeepEqualOne = objUtils.isDeepEqual({a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}, {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}});
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed the test case');
}
try {
    // Should fail
    const isDeepEqualTwo = objUtils.isDeepEqual("foo", "bar");
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully');
}

// Compute object tests
try {
    // Should pass
    const computeObjectOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully');
} catch (e) {
    console.error('computeObject failed the test case');
}
try {
    // Should fail
    const computeObjectTwo = objUtils.computeObject(n => n * 2);
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully');
}