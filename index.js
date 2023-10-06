const words = ['pumpkin', 'skeleton', 'zombie', 'goblin', 'werewolf', 'monster', 'spider', 'graveyard', 'dracula', 'vampire'];

const bodyParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let gameHasStarted = false;

document.addEventListener("keydown", playGame);

function chooseRandomWord(list) {
    let word = list[Math.floor(Math.random() * list.length)];
    return word;
};

function hideMan() {
    for (let i=0; i<bodyParts.length; i++) {
        document.getElementById(bodyParts[i]).style.display = "None";
    };
};

function displayWord(word) {
    let wordDisplay =  "_ ".repeat(word.length);
    let lettersHtml = "";

    for (let i=0; i<alphabet.length; i++) {
        lettersHtml += "<span id='" +  alphabet[i] + "'>" + alphabet[i] + "</span> ";
    };

    document.getElementById("text").innerHTML = "<h1 id='word-display'>" + wordDisplay + "</h1><h3 id='guess-text'>Guess a letter!<br></h3><p>" + lettersHtml + "</p>";

    return wordDisplay;
};

function strikeOutLetter(letter){
    document.getElementById(letter).style.textDecoration = "line-through";
};

function addBodyPart(n) {
    document.getElementById(bodyParts[n]).style.display = "block";
};

function displayWinMessage() {
    document.getElementById('guess-text').innerHTML = `Yay! You won the game!<br>Press any key to play again.`
};

function displayLoseMessage(word) {
    document.getElementById('guess-text').innerHTML= `Oh no! 'You lost the game.<br>The word was '${word}'.<br>Press any key to play again.`
}

function displayRightMessage(letter) {
    document.getElementById('guess-text').innerHTML = `Good job! '${letter}' is in the word.<br>Guess another letter.`;
};

function displayWrongMessage(letter) {
    document.getElementById('guess-text').innerHTML= `Bad luck! '${letter}' is not in the word.<br>Guess another letter.`
};

function alreadyTriedMessage() {
    document.getElementById('guess-text').innerHTML = `You've already tried that letter!<br>Guess another letter.`;
};

function playGame() {
    if (!gameHasStarted) {
        gameHasStarted = true;
        let wordGuessed = false;
        let lettersChosen = [];
        let bodyPartNum = 0;

        const wordChoice = chooseRandomWord(words);

        hideMan();

        let wordDisplay = displayWord(wordChoice);
        let chosenLetter;
        let canPick = true;

        document.addEventListener("keydown", function(e) {
            if (canPick){
                chosenLetter = e.key;
                
                if (!lettersChosen.includes(chosenLetter)) {
                    lettersChosen.push(chosenLetter);
                    strikeOutLetter(chosenLetter);
                   
                    if (wordChoice.includes(chosenLetter)) {
                        
                        let wordDisplayArray = wordDisplay.split("")
                        for (let i=0; i<wordChoice.length; i++){
                            if (wordChoice.charAt(i) === chosenLetter) {
                                wordDisplayArray[i*2] = chosenLetter;
                            }
                        wordDisplay = wordDisplayArray.join("")
                        }
            
                        document.getElementById("word-display").innerText = wordDisplay;   
                        
                        if (wordDisplay.includes("_")) {
                            displayRightMessage(chosenLetter);
                            
                        }

                        else {
                            displayWinMessage();
                            canPick = false;
                            gameHasStarted = false;
                        };
                    }

                    else {
                        addBodyPart(bodyPartNum);
                        if (bodyPartNum <5){
                            displayWrongMessage(chosenLetter);
                            bodyPartNum++;
                        }

                        else {
                            displayLoseMessage(wordChoice);
                            canPick = false;
                            gameHasStarted = false;
                        }
                    }
                }

                else {
                   alreadyTriedMessage();
                }
                }
            }
            )
        }
};
