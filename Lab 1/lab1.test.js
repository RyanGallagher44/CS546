const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should output 14
console.log(lab1.questionOne([5, 3, 10]));
// should output 134
console.log(lab1.questionOne([2, 1, 2]));
// should output 9
console.log(lab1.questionOne([5, 10, 9]));
// should output 206
console.log(lab1.questionOne([15, 3, 20]));
// should output 634
console.log(lab1.questionOne([12, 12, 12]));
// should output 432

console.log(lab1.questionTwo(7)); 
// should output 13 
console.log(lab1.questionTwo(10));
// should output 55
console.log(lab1.questionTwo(0));
// should output 0
console.log(lab1.questionTwo(-45));
// should output 0
console.log(lab1.questionTwo(3));
// should output 2
console.log(lab1.questionTwo(14));
// should output 377
console.log(lab1.questionTwo(1));
// should output 1 

console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.")); 
// should output 196
console.log(lab1.questionThree("It is during our darkest moments that we must focus to see the light."));
// should output 20
console.log(lab1.questionThree("You miss one hundred percent of the shots you don't take."));
// should output 17
console.log(lab1.questionThree("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
// should output 167

console.log(lab1.questionFour(10)); 
// should output 3628800
console.log(lab1.questionFour(-63));
// should output NaN
console.log(lab1.questionFour(6));
// should output 720
console.log(lab1.questionFour(3));
// should output 6
console.log(lab1.questionFour(12));
// should output 479001600
console.log(lab1.questionFour(0));
// should output 1
console.log(lab1.questionFour(1));
// should output 1