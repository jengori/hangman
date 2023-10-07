const words = ['pumpkin', 'skeleton', 'zombie', 'goblin', 'werewolf', 'monster', 'spider', 'graveyard', 'dracula', 'vampire'];
const bodyParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const gameState = {
  hasStarted: false,
  guessedWord: '',
  guessedLetters: [],
  wrongGuessCount: 0,
  firstGame: true
};

document.addEventListener('keydown', initiateGame);

function chooseRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function hideMan() {
  bodyParts.forEach(part => {
    document.getElementById(part).style.display = 'none';
  });
}

function displayWord(word) {
  const hiddenWord = '_ '.repeat(word.length);
  const lettersHtml = alphabet.map(letter => `<span id='${letter}'>${letter}</span> `).join('');

  document.getElementById('text').innerHTML = `<h1 id='word-display'>${hiddenWord}</h1><h3 id='guess-text'>Guess a letter!<br></h3><p>${lettersHtml}</p>`;
  return hiddenWord;
}

function updateMessage(id, message) {
  document.getElementById(id).innerHTML = message;
}

function processGuess(chosenLetter) {
  const { guessedWord, guessedLetters, wrongGuessCount } = gameState;
  
  if (guessedLetters.includes(chosenLetter)) {
    updateMessage('guess-text', `You've already tried '${chosenLetter}'. Try another letter.`);
    return;
  }

  guessedLetters.push(chosenLetter);
  document.getElementById(chosenLetter).style.textDecoration = 'line-through';

  if (guessedWord.includes(chosenLetter)) {
    const updatedDisplay = guessedWord.split('').map((letter, i) => {
      return guessedLetters.includes(letter) ? letter : '_';
    }).join(' ');

    document.getElementById('word-display').innerText = updatedDisplay;
    updateMessage('guess-text', `Good job! '${chosenLetter}' is in the word. Guess another letter.`);

    if (!updatedDisplay.includes('_')) {
      updateMessage('guess-text', 'Yay! You won the game! Press any key to play again.');
      resetGame();
    }
  } else {
    document.getElementById(bodyParts[wrongGuessCount]).style.display = 'block';
    gameState.wrongGuessCount++;

    if (wrongGuessCount < bodyParts.length - 1) {
      updateMessage('guess-text', `Bad luck! '${chosenLetter}' is not in the word. Guess another letter.`);
    } else {
      updateMessage('guess-text', `Oh no! You lost. The word was '${guessedWord}'. Press any key to play again.`);
      resetGame();
    }
  }
}

function resetGame() {
  gameState.hasStarted = false;
  gameState.guessedWord = '';
  gameState.guessedLetters = [];
  gameState.wrongGuessCount = 0;
  gameState.firstGame = false;
}

function initiateGame(e) {
  if (!gameState.hasStarted) {
    gameState.hasStarted = true;
    gameState.guessedWord = chooseRandomWord(words);
    
    hideMan();
    displayWord(gameState.guessedWord);

    if (gameState.firstGame) {
      document.addEventListener('keydown', e => {
      const chosenLetter = e.key.toLowerCase();
      if (alphabet.includes(chosenLetter)) {
        processGuess(chosenLetter);
      }
      });
    };
  }
}
