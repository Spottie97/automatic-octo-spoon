// Select the card elements
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let time = 0;
let timerId;

// Shuffle the cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

// Add event listeners to the cards
cards.forEach(card => card.addEventListener('click', flipCard));

// Function to start the timer
function startTimer() {
  timerId = setInterval(() => {
    time++;
    document.getElementById('time').textContent = time;
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerId);
}

// Function to flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card
  secondCard = this;
  checkForMatch();
}

// Function to check if the cards match
function checkForMatch() {
  let isMatch = firstCard.querySelector('.front').style.backgroundImage === secondCard.querySelector('.front').style.backgroundImage;

  isMatch ? disableCards() : unflipCards();
}

// Function to disable the cards when they match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  score++;
  document.getElementById('score').textContent = score;
  if (score === 8) {
    // Player has won
    stopTimer();
    setTimeout(() => {
      alert('Congratulations! You won!');
    }, 500);
  }
}

// Function to unflip the cards when they don't match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Function to reset the board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to reset the game
function resetGame() {
  score = 0;
  time = 0;
  stopTimer();
  document.getElementById('score').textContent = score;
  document.getElementById('time').textContent = time;
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 16);
      card.style.order = randomPos;
    });
  })();
}

// Add event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);

// Start the timer
startTimer();
