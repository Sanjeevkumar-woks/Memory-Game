document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-btn");

  //Cards-images
  const cardImages = ["1.png", "2.jpg", "3.jpeg", "4.jpeg", "5.jpeg"];

  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  let startTime;
  let timerInterval;

  //Card-Creation
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

  // The Fisher–Yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //setup-board
  function setupGame() {
    cards = [...cardImages, ...cardImages];
    shuffle(cards);
    board.innerHTML = "";
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    cards.forEach((image) => {
      const card = createCard(image);
      board.appendChild(card);
    });
  }

  //FlipCard-function
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

  //check card Match
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

  //Reset Board Function
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;

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

  restartButton.addEventListener("click", setupGame);

  setupGame();
});
