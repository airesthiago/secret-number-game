let listOfSortedNumbers = [];
let maxNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'US English Female', { rate: 1.2 });
}

function showInitialMessage() {
    showTextOnScreen('h1', 'Game - Guess the secret number');
    showTextOnScreen('p', `Choose a number between 1 and  ${ maxNumber }`);
}

showInitialMessage();

function verifyGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        showTextOnScreen('h1', 'Congratulations, you got it!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let message = `You'd discovered the secret number in ${ attempts } ${ attemptWord }!`;
        showTextOnScreen('p', message);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber ) {
            showTextOnScreen('p', `Choose another number smaller than ${ guess }`);
        } else {
            showTextOnScreen('p', `Choose another number greater than ${ guess }`);
        }
        attempts++;
        clearAttempts();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * maxNumber + 1);
    let numberOfElementsInList = listOfSortedNumbers.length;

    if (numberOfElementsInList == maxNumber) {
        listOfSortedNumbers = [];
    }

    if (listOfSortedNumbers.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        listOfSortedNumbers.push(chosenNumber);
        return chosenNumber;
    }
}

function clearAttempts() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    clearAttempts();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}
