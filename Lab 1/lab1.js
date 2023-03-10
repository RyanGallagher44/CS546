const questionOne = function questionOne(arr) {
    let sum = 0;
    let arrSquared = arr.map((element) => {
        return element * element;
    });
    arrSquared.forEach((element) => {
        sum += element;
    });
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if (num < 1) {
        return 0;
    } else if (num == 1) {
        return 1;
    } else {
        return questionTwo(num-2)+questionTwo(num-1);
    }
}

const questionThree = function questionThree(text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        let curr = text.charAt(i).toLowerCase();
        if (curr == 'a' || curr == 'e' ||
            curr == 'i' || curr == 'o' || curr == 'u') {
            count++;
        }
    }
    return count;
}

const questionFour = function questionFour(num) {
    if (num < 0) {
        return NaN;
    } else if (num == 0) {
        return 1;
    } else {
        return num * questionFour(num-1);
    }
}

module.exports = {
    firstName: "Ryan", 
    lastName: "Gallagher", 
    studentId: "10445392",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};