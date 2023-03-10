const checkForValidArrayOfNums = function checkForValidArrayOfNums(array) {
    if (!array) throw "The array does not exist";
    if (!Array.isArray(array)) throw "Input must be an array";
    if (array.length === 0) throw "The array cannot be empty";
    array.forEach((element) => {
        if (typeof element != 'number') throw "Each array element must be a number";
    });
}

const mean = function mean(array) {
    checkForValidArrayOfNums(array);    //Error checking
    let sum = 0;
    array.forEach((element) => {
        sum += element;
    });
    return sum/array.length;
}

const medianSquared = function medianSquared(array) {
    checkForValidArrayOfNums(array);    //Error checking
    array = array.sort(function(a, b) { //source: https://www.w3schools.com/jsref/jsref_sort.asp#:~:text=The%20sort%20function%20will%20sort,60%20(a%20negative%20value).
        return a-b;
    });
    let median = 0;
    if (array.length % 2 == 0) {
        median = (array[Math.trunc(array.length/2)]+array[(Math.trunc(array.length/2))-1])/2;
    } else if (array.length % 2 != 0) {
        median = array[Math.trunc(array.length/2)];
    }
    return median*median;
}

const maxElement = function maxElement(array) {
    checkForValidArrayOfNums(array);    //Error checking
    let max = Number.MIN_VALUE;
    let max_index = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            max_index = i;
        }
    }
    return {[max]: max_index};
}

const fill = function fill(end, value) {
    if (!end) throw "End does not exist";   //Error checking
    if (typeof end != 'number') throw "End must be a number";
    end = Math.trunc(end);
    if (end <= 0) throw "End must be greater than 0";
    let arr = [];
    for (let i = 0; i < end; i++) {
        if (!value) {
            arr.push(i);
        } else {
            arr.push(value);
        }
    }
    return arr;
}

const countRepeating = function countRepeating(array) {
    if (!array) throw "The array does not exist";   //Error checking
    if (!Array.isArray(array)) throw "Input must be an array";
    if (array.length === 0) {
        return {};
    }
    let newObj = {};
    array.forEach((element) => {
        if (!newObj[element]) {
            newObj[element] = 1;
        } else {
            newObj[element] = newObj[element]+1;
        }
    });
    for (const key in newObj) {
        if (newObj[key] < 2) {
            delete newObj[key]; //source: https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
        }
    }
    return newObj;
}

const isEqual = function isEqual(arrayOne, arrayTwo) {
    if (!arrayOne) throw "The first array does not exist";
    if (!Array.isArray(arrayOne)) throw "First array must be an array";
    if (!arrayTwo) throw "The second array does not exist";
    if (!Array.isArray(arrayTwo)) throw "Second array must be an array";
    if (arrayOne.length != arrayTwo.length) {
        return false;
    } else {
        arrayOne.sort();
        arrayTwo.sort();
        arrayOne.forEach((element) => {
            if (Array.isArray(element)) {
                element.sort();
            }
        });
        arrayTwo.forEach((element) => {
            if (Array.isArray(element)) {
                element.sort();
            }
        });
    }
    for (let i = 0; i < arrayOne.length; i++) {
        if (!Array.isArray(arrayOne[i]) && !Array.isArray(arrayTwo[i])) {
            if (arrayOne[i] != arrayTwo[i]) {
                return false;
            }
        } else if ((!Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) ||
                    Array.isArray(arrayOne[i]) && !Array.isArray(arrayTwo[i])) {
            return false;
        } else {
            if (arrayOne[i].length != arrayTwo[i].length) {
                return false;
            } else {
                for (let j = 0; j < arrayOne[i].length; j++) {
                    if (arrayOne[i][j] != arrayTwo[i][j]) {
                        return false;
                    } 
                }
            }
        }
    }
    return true;
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}