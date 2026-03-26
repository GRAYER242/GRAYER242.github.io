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

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    revealed[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = OPEN_SPACE;
      revealed[i][j] = false;
    }
  }
  let placed = 0;
  while (placed < minesCount) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    if (grid[x][y] === OPEN_SPACE) {
      grid[x][y] = MINE;
      placed++;
    }
  }
}

function draw() {
  background(15);
  drawUI();
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = uiWidth + i * cellSize;
      let y = j * cellSize;

      stroke(40);

      if (revealed[i][j]) {
        if (grid[i][j] === MINE) {
          fill(200, 50, 50);
        }
        else {
          fill(50, 200, 120);
        }
      }
      else {
        fill(30);
      }
      
      rect(x, y, cellSize / 2, y + cellSize / 2, 20);

      if (revealed[i][j] && grid[i][j] === MINE) {
        fill(0);
        ellipse(x + cellSize / 2, y + cellSize / 2, 20);
      }
    }
  }
}

function drawUI() {
  let panelX = 10;

  fill(40);
  rect(0, 0, uiWidth, height);

  fill(255);
  textSize(16);
}

function mousePressed() {
  let panelX = 10;

  if (mouseX > panelX && mouseX < panelX + uiWidth - 20) {

  }
}