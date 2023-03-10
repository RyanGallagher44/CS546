const checkValidityOfMakeArrays = function checkValidityOfMakeArrays(array) {
    if (!array) throw "The array does not exist";
    if (!Array.isArray(array)) throw "Input must be an array";
    if (array.length === 0) throw "The array cannot be empty";
    array.forEach((element) => {
        if (typeof element != 'object') throw "Each array element must be an object";
        if (Object.keys(element).length === 0) throw "Each array element must be a non-empty object";   //source: https://bobbyhadz.com/blog/javascript-check-if-object-is-empty
    });
    if (array.length < 2) throw "There must be at least 2 objects in the array";
}

const checkValidityOfComputeObject = function checkValidityOfComputeObject(object, func) {
    if (!object) throw "The object does not exist";
    if (typeof object != 'object') throw "The object must be an object";
    if (!func) throw "The function does not exist";
    if (typeof func != 'function') throw "The function must be a function";
    for (const key in object) {
        if (typeof object[key] != 'number') throw "Each object values must be a number (+, -, decimal)";
    }
}

const checkValidityOfIsDeepEqual = function checkValidityOfIsDeepEqual(obj1, obj2) {
    if (!obj1) throw "The first object does not exist";
    if (typeof obj1 != 'object') throw "The first object must be an object";
    if (!obj2) throw "The second object does not exist";
    if (typeof obj2 != 'object') throw "The second object must be an object";
}

const makeArrays = function makeArrays(objects) {
    checkValidityOfMakeArrays(objects);   //Error checking
    let arr = [];
    objects.forEach((element) => {
        for (const key in element) {
            arr.push([key, element[key]]);
        }
    });
    return arr;
}

const isDeepEqual = function isDeepEqual(obj1, obj2) {
    checkValidityOfIsDeepEqual(obj1, obj2); //Error checking
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false;
    } else {
        for (const key in obj1) {
            if (!obj2[key]) {
                return false;
            } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                return isDeepEqual(obj1[key], obj2[key]);
            } else if (obj1[key] != obj2[key]) {
                return false;
            }
        }
    }
    return true;
}

const computeObject = function computeObject(object, func) {
    checkValidityOfComputeObject(object, func); //Error checking
    let newObj = {};
    for (const key in object) {
        newObj[key] = func(object[key]);
    }
    return newObj;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}