# Memory Game

A simple and interactive memory game built with HTML, CSS, and JavaScript. Players flip cards to find matching pairs, and the game features a flower shower effect to celebrate when the player wins.

## Demo

Check out the live demo: [Memory Game](https://memory-game-in.netlify.app/)

## Features

- **Interactive Gameplay:** Players can flip cards to find matching pairs.
- **Responsive Design:** The game adapts to different screen sizes, ensuring a smooth experience on both desktop and mobile devices.
- **Animations:** Smooth card flipping animations and a celebratory flower shower effect upon winning.
- **Randomized Card Layout:** The cards are shuffled at the start of each game using the Fisher-Yates shuffle algorithm.

## How to Play

1. Click on a card to flip it.
2. Try to find and match the pairs of cards.
3. When all pairs are matched, you win the game, and a flower shower will celebrate your victory!

## Installation

To run this game locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanjeevkumar-woks/memory-game.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd memory-game
   ```
3. **Open the `index.html` file in your browser:**
   ```bash
   open index.html
   ```
   or simply double-click on the `index.html` file.

## Usage

Simply open the game in your web browser and start playing. The game is self-contained and doesn't require any additional setup.

## Customization

You can customize the game by modifying the following:

- **Card Images:** Replace the images in the `img` folder with your own images.

- **Game Logic:** Modify the JavaScript file to adjust the game's difficulty or add new features.

### Code Snippets

#### Fisher-Yates Shuffle

The game uses the Fisher-Yates shuffle algorithm to randomize the card order:

```javascript
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
