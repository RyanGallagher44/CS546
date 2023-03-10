let myForm = document.getElementById('form');
let myUl = document.getElementById('attempts');
let myInput = document.getElementById('numInput');
let myDiv = document.getElementById('error');
let myLabel = document.getElementById('numInputLabel');

myInput.classList.remove('error-border');
myLabel.classList.remove('error-label');

function isPrime(n) {
    if (n < 2) {
        return false;
    } else {
        for (let i = 2; i < n; i++) {
            if (n % i == 0) {
                return false;
            }
        }
    }
    return true;
}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        numEntered = myInput.value.trim();
        numEntered = parseInt(myInput.value);
        console.log(numEntered);
        if ((numEntered && numEntered != NaN) || (!numEntered && numEntered === 0)) {
            if (myInput.value >= 0) {
                myInput.classList.remove('error-border');
                myLabel.classList.remove('error-label');
                myDiv.hidden = true;
                let li = document.createElement('li');
                if (isPrime(myInput.value)) {    
                    li.innerHTML = `${myInput.value} is a prime number`;
                    li.classList.add('is-prime');
                } else {
                    li.innerHTML = `${myInput.value} is NOT a prime number`;
                    li.classList.add('not-prime');
                }
                myUl.appendChild(li);
                myForm.reset();
                myInput.focus();
            } else {
                myInput.classList.add('error-border');
                myLabel.classList.add('error-label');
                myDiv.hidden = false;
                myDiv.innerHTML = 'Your number cannot be negative!';
                myInput.focus();
            }
        } else {
            myInput.classList.add('error-border');
            myLabel.classList.add('error-label');
            myDiv.hidden = false;
            myDiv.innerHTML = 'You must enter a number!';
            myInput.focus();
        }
    });
}