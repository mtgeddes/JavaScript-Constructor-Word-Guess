let letterFunction = require("./letter");
let wordFunction = require("./word");
let inquirer = require('inquirer');


let game = function () {
   
    let wordArray = ["Jurassic Park", "Test", "Hoover Dam", "Sports", "Music", "Fun in the Sun", "Hello!", "This assignment deserves an A plus"];
    let word;
    let guessedLetter;
    let allCorrect = true;
    let correctLetters;
    let guessesLeft = 0;
    let usedLetters = '';

    // Font color variables...
    let FgBlack = "\x1b[30m";
    let FgRed = "\x1b[31m";
    let FgGreen = "\x1b[32m";
    let FgYellow = "\x1b[33m";
    let FgBlue = "\x1b[34m";
    let FgMagenta = "\x1b[35m";
    let FgCyan = "\x1b[36m";
    let FgWhite = "\x1b[37m";


    // Sets up the game...
    let startGame = function (word) {
        newWord();
        askUser();
    };

    // Pulls a new word...
    let newWord = function () {
        word = new wordFunction(wordArray[Math.floor(Math.random() * wordArray.length)]);
        listOfCorrectLettersFunction();
        word.wordShow();
        guessesLeft = word.letterArray.length;
        usedLetters = '';
    };

    // Checks if all letters have been guessed...
    let checkIfAllCorrect = function () {
        for (let i = 0; i < word.letterArray.length; i++) {
            if (word.letterArray[i].show === false) {
                return allCorrect = false
            }
            else {
                allCorrect = true;
            };
        };
    };

    // Lists out the correct letters for user to guess...
    let listOfCorrectLettersFunction = function () {
        correctLetters = ''
        for (let i in word.letterArray) {
            correctLetters+= word.letterArray[i].letter.toUpperCase()
        };
    };

    // Asks user to guess...
    let askUser = function () {
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter!",
                name: 'guess'
            },
        ]).then(answers => {
            guessedLetter = answers.guess.toUpperCase();

            // Stops user from re-using a guess...
            if (usedLetters.indexOf(guessedLetter) !== -1) {
                console.log("You have previously guessed that letter.");
                word.wordShow();
                askUser();
            } 

            // Makes sure user doesn't input more than one letter...
            else if (answers.guess.length > 1) {
                console.log("Please input only one letter");
                askUser();
                usedLetters += guessedLetter;
                word.wordShow();
            } 

            // Deducts from remaining guesses if incorrect. Also, ends game when 0...
            else if (correctLetters.indexOf(guessedLetter) === -1) {
                guessesLeft--;
                usedLetters += guessedLetter;
                word.wordShow();
                if (guessesLeft === 0) {
                    console.log(FgRed + 'Incorrect.' + FgWhite);
                    console.log('You lost. Try again. \n');
                    newWord();
                    askUser();
                } else {
                    console.log(FgRed + 'Incorrect.' + FgWhite);
                    console.log('You have ' + guessesLeft + ' guesses left.');
                    console.log('\n');
                    askUser();
                };
            } 

            // Updates display with correctly guessed letters. Also, if won, pulls a new word...
            else {
                usedLetters += guessedLetter;
                word.functionUpdate(guessedLetter);
                word.wordShow();
                console.log(FgGreen + "Correct!" + FgWhite);
                console.log('\n');
                checkIfAllCorrect();
                if (allCorrect === true) {
                    console.log(FgGreen + "Correct! " + FgWhite +  "New word!");
                    newWord();
                };
                askUser();
            };
            
        })};
    startGame();
};

game(); // Starts the game...
