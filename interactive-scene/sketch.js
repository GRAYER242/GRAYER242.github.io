// Catch the Circle
// Grayer Hardy
// 2/2/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let playerX;
let playerY;
let targetX;
let targetY;
let targetSpeedX;
let targetSpeedY;
let score = 0;
let gameState = "start"; // start, playing, gameover
let startTime;
let gameTime = 30; // seconds

function setup() {
  createCanvas(600, 400);
  resetGame();
}

function draw() {
  background(220);

  if (gameState === "start") {
    showStartScreen();
  } 
  else if (gameState === "playing") {
    playGame();
  } 
  else if (gameState === "gameover") {
    showGameOver();
  }
}

function playGame() {
  // Player follows mouse
  playerX = mouseX;
  playerY = mouseY;

  // Draw player
  fill(0, 100, 255);
  ellipse(playerX, playerY, 40);

  // Move target
  targetX += targetSpeedX;
  targetY += targetSpeedY;

  // Bounce logic
  let radius = 15;

  if (targetX - radius <= 0) {
    targetX = radius;
    targetSpeedX *= -1;
  }

  if (targetX + radius >= width) {
    targetX = width - radius;
    targetSpeedX *= -1;
  }

  if (targetY - radius <= 0) {
    targetY = radius;
    targetSpeedY *= -1;
  }

  if (targetY + radius >= height) {
    targetY = height - radius;
    targetSpeedY *= -1;
  }

  // Draw target
  fill(255, 0, 0);
  ellipse(targetX, targetY, 30);

  // Collisions
  let d = dist(playerX, playerY, targetX, targetY);

  if (d < 35) {
    score++;

    targetX = random(width);
    targetY = random(height);

    targetSpeedX *= 1.1;
    targetSpeedY *= 1.1;
  }

  // Timer
  let timePassed = (millis() - startTime) / 1000;
  let timeLeft = gameTime - timePassed;

  if (timeLeft <= 0) {
    gameState = "gameover";
  }

  // Display score (left)
  textAlign(LEFT);
  fill(0);
  textSize(20);
  text("Score: " + score, 20, 30);

  // Display timer (right)
  textAlign(RIGHT);
  text("Time: " + ceil(timeLeft), width - 20, 30);
}

function showStartScreen() {
  textAlign(CENTER);
  fill(0);
  textSize(28);
  text("Catch the Circle", width / 2, height / 2 - 40);

  textSize(18);
  text("You have 30 seconds!", width / 2, height / 2);
  text("Move mouse to catch the red circle", width / 2, height / 2 + 30);
  text("Press S to Start", width / 2, height / 2 + 60);
}

function showGameOver() {
  textAlign(CENTER);
  fill(0);
  textSize(28);
  text("Time's Up!", width / 2, height / 2 - 20);

  textSize(20);
  text("Final Score: " + score, width / 2, height / 2 + 20);
  text("Press R to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    startTime = millis();
    gameState = "playing";
  }

  if (key === "r" || key === "R") {
    resetGame();
    gameState = "start";
  }
}

function resetGame() {
  score = 0;

  targetX = random(width);
  targetY = random(height);

  targetSpeedX = random(2, 4);
  targetSpeedY = random(2, 4);
}
