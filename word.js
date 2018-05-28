

let letterFunction = require("./letter");

function wordFunction(word) {

    this.word = word;
    this.letterArray = [];

    // Fills the letter array with letter objects...
    this.fillLetterArray = function() {
        for (let i = 0; i < this.word.length; i++) {
            this.letterArray.push(new letterFunction(this.word[i]));
        };
    };
    this.fillLetterArray();

    // Displays letters based on whether they have been guessed or not...
    this.wordShow = function () {
        let str = ''
        for (var i = 0; i < this.letterArray.length; i++) {
            str += `${this.letterArray[i].underscore()} `;
        }
        console.log('\n');
        console.log(str);
        console.log('\n');
        return str;
    };

    // Runs letter function (see displayLetter function in letter.js)...
    this.functionUpdate = function(GUESSEDLETTER) {
        for (let i = 0; i < this.word.length; i++) {
            this.letterArray[i].displayLetter(GUESSEDLETTER);
        };
    };
};

module.exports = wordFunction;