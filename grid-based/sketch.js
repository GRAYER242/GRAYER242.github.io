// Grid Based Assignment
// Grayer Hardy
// 2026-03-25
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MINE = 1;         // Represents a mine in the grid
const OPEN_SPACE = 0;   // Represents an empty/revealed space
let cols = 5;           
let rows = 5;           
let grid = [];          // Stores the grid layout (mines and open spaces)
let revealed = [];      // Tracks which cells have been revealed
let minesCount = 5;     
let cellSize = 80;      
let balance = 1000;     // Player's current balance
let bet = 100;          // Current bet amount
let multiplier = 1.0;   // Multiplier for winnings
let playing = false;    
let gameOver = false;   
let showMenu = true;    
let uiWidth = 200;     

function setup() {
  createCanvas(uiWidth + cols * cellSize, rows * cellSize);
  resetGame();
}

function resetGame() {
  grid = [];
  revealed = [];
  multiplier = 1.0;
  gameOver = false;
}

function draw() {
  background(15);
}
