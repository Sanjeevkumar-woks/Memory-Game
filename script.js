document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-btn");

  // Array of card images
  const cardImages = ["1.png", "2.jpg", "3.jpeg", "4.jpeg", "5.jpeg"];

  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  let startTime;
  let timerInterval;

  //Creates a card element with the given image.

  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    const frontFace = document.createElement("img");
    frontFace.src = `./${image}`;
    cardBack.appendChild(frontFace);

    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);
    card.appendChild(cardContainer);

    card.addEventListener("click", flipCard);
    return card;
  }

  //Shuffles an array using the Fisher-Yates algorithm.

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Sets up the game board with shuffled cards and starts the timer.

  function setupGame() {
    cards = [...cardImages, ...cardImages]; // Duplicate the images array for pairs
    shuffle(cards); // Shuffle the card images
    board.innerHTML = ""; // Clear the board
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    startTime = new Date(); // Record the start time

    // Create and append cards to the board
    cards.forEach((image) => {
      const card = createCard(image);
      board.appendChild(card);
    });

    // Reset and start the timer
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  }

  //Updates the timer and logs the elapsed time.

  function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    console.log(`Elapsed time: ${elapsedTime} seconds`);
  }

  // Handles the logic when a card is clicked.

  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("flipped"))
      return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    checkMatch();
  }

  //Checks if the two flipped cards match.

  function checkMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      resetBoard();
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
      }, 1000);
    }
  }

  //Resets the board and checks if the game is complete.

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;

    // Check if all pairs are matched
    if (document.querySelectorAll(".matched").length === cards.length) {
      clearInterval(timerInterval); // Stop the timer when the game ends
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate time taken in seconds
      setTimeout(
        () =>
          alert(
            `Congratulations, you found all pairs in ${timeTaken} seconds!`
          ),
        500
      );
    }
  }

  // Add event listener to restart button
  restartButton.addEventListener("click", setupGame);

  // Initialize the game
  setupGame();
});
