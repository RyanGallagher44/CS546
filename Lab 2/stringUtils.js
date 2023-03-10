const checkIfStringExists = function checkIfStringExists(string, numStr) {
    if (!numStr) {
        if (!string) throw "The string does not exist";
    } else {
        if (!string) throw `The ${numStr} string does not exist`;
    }
}

const checkIfStringIsProperType = function checkIfStringIsProperType(string, numStr) {
    if (!numStr) {
        if (typeof string != 'string') throw "The string must be a string";
    } else {
        if (typeof string != 'string') throw `The ${numStr} string must be a string`;
    }
}

const checkForValidStringLength = function checkForValidStringLength(string, validLength, numStr) {
    if (!numStr) {
        if (string.trim().length <= validLength) throw `The string must have length greater than ${validLength}`;
    } else {
        if (string.trim().length <= validLength) throw `The ${numStr} string must have length greater than ${validLength}`;
    }
}

const camelCase = function camelCase(string) {
    checkIfStringExists(string);    //Error checking
    checkIfStringIsProperType(string);
    checkForValidStringLength(string, 0);
    let strArr = string.split(' ');
    let result = strArr[0].toLowerCase();
    for (let i = 1; i < strArr.length; i++) {
        result += strArr[i].charAt(0).toUpperCase()+strArr[i].substring(1).toLowerCase();
    }
    return result;
}

const replaceChar = function replaceChar(string) {
    checkIfStringExists(string);       //Error checking
    checkIfStringIsProperType(string);
    checkForValidStringLength(string, 0);
    let count = 0;
    let startChar = string.charAt(0).toLowerCase();
    for (let i = 1; i < string.length; i++) {
        if (string.charAt(i).toLowerCase() == startChar) {
            if (count == 0) {
                string = string.substring(0,i)+"*"+string.substring(i+1);
                count++;
            } else {
                string = string.substring(0,i)+"$"+string.substring(i+1);
                count--;
            }
        }
    }
    return string;
}

const mashUp = function mashUp(string1, string2) {
    checkIfStringExists(string1, "first");  //Error checking
    checkIfStringExists(string2, "second");
    checkIfStringIsProperType(string1, "first");
    checkIfStringIsProperType(string2, "second");
    checkForValidStringLength(string1, 1, "first");
    checkForValidStringLength(string2, 1, "second");
    return string2.substring(0,2)+string1.substring(2)+" "+string1.substring(0,2)+string2.substring(2);
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}