
function letterFunction(letter) {

    this.letter = letter; 
    this.show = false; 

    if (this.letter === ' ') {
        this.show = true;
    };

    // Displays/Hides letter based on boolean status...
    this.underscore = function () {

        if (this.show === true) {
            return this.letter;
        }
        else {
            return "_";
        };
    };

    // Updates boolean status if input letter matches...
    this.displayLetter = function (GUESSEDLETTER) {       
        if (this.letter.toUpperCase() === GUESSEDLETTER) {
            this.show = true;
        }; 
    };
};

module.exports = letterFunction;