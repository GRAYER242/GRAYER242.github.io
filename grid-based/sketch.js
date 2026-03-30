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

// still need to fix
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

      rect(x, y, cellSize, cellSize, 10);

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

  text("Balance: $" + balance, panelX, 40);
  text("Bet: $" + bet, panelX, 70);
  text("Multiplier: x" + floor(multiplier * 100) / 100, panelX, 100);

  let profit = bet * multiplier;
  text("Profit: $" + floor(profit), panelX, 130);

  let startColor;
  if (playing) {
    startColor = (200, 0, 0);
  }
  else {
    startColor = color(0, 200, 0);
  }

  drawButton(panelX, 160, "Start", startColor);
  drawButton(panelX, 210, "Cash Out",);
  drawButton(panelX, 260, "Bet +",);
  drawButton(panelX, 310, "Bet -");
}

function drawButton(x, y, label, btnColor) {
  if (!btnColor) {
    btnColor = color(60);
  }

  fill(btnColor);
  rect(x, y, uiWidth - 20, 40, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  text(label, x + (uiWidth - 20) / 2, y + 20);
  textAlign(LEFT);
}

// change to buttons?
function mousePressed() {
  let panelX = 10;

  if (mouseX > panelX && mouseX < panelX + uiWidth - 20) {
    if (mouseY > 160 && mouseY < 200) {
      startGame();
    }
    if (mouseY > 210 && mouseY < 250 && playing) {
      cashOut();
    }
    if (mouseY > 260 && mouseY < 300) {
      bet += 10;
    }
    if (mouseY > 310 && mouseY < 350) {
      bet = max(10, bet - 10);
    }
  }

  if (!playing) {
    return;
  }

  let i = floor((mouseX - uiWidth) / cellSize);
  let j = floor(mouseY / cellSize);

  if (i >= 0 && j >= 0 && i < cols && j < rows) {
    if (!revealed[i][j]) {
      revealed[i][j] = true;

      if (grid[i][j] === MINE) {
        loseGame();
      }
      else {
        multiplier += 0.3;
      }
    }
  }
}

function startGame() {
  if (playing || balance < bet) {
    return;
  }
  balance -= bet;
  playing = true;
  showMenu = false;
  resetGame();
}

function cashOut() {
  if (!playing) {
    return;
  }
  let winnings = bet * multiplier;
  balance += winnings;

  playing = false;
  showMenu = true;

  alert("Cashed out: $" + floor(winnings * 100) / 100);
}

function loseGame() {
  playing = false;
  gameOver = true;
  showMenu = true;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === MINE) {
        revealed[i][j] = true;
      }
    }
  }
  alert("You hit a mine!");
}