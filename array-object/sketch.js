// Arrays and Object Notation Assignment
// Grayer Hardy
// 3/9/2026
//
// Extra for Experts:
// - Used new functions such as createVector and min/max
// - Made image inside of moving object

// Defining variables
// Block dimensions
let blockWidth = 300;
let blockHeight = 30;

// Block movement
let currentBlock;
let blockDirection;
let blockSpeed;
let placedBlocks = [];

// Win/lose/playing state variables
let statePlaying = "playing";
let stateLose = "lose";
let stateWin = "win";
let menuState = statePlaying;

// Images
let sky;
let wood;

function preload() {
  sky = loadImage("Sky.jpg"); // Background sky
  wood = loadImage("Wood.jpg"); // Block texture
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  newGame(); // Initializes game state
}

// State variables
function draw() {
  background(220);
  image(sky, width/2, height/2, windowWidth, windowHeight);

  // Playing
  if (menuState === statePlaying) {
    textSize(blockHeight);
    updateBlock(); // Moves the current block left/right
    drawBlocks(); // Draws the current and placed blocks
  }
  // Lose
  else if (menuState === stateLose) {
    textSize(blockHeight * 2);
    fill(255, 0, 0);
    text("Sorry, you Lost...", width / 2, height / 2);
    textSize(blockHeight);
    text("Press Space to Start a New Game!", width / 2, height * 3 / 4);
  }
  // Win
  else if (menuState === stateWin) {
    textSize(blockHeight * 2);
    fill(0, 255, 0);
    text("Congrats, you Won!", width / 2, height / 2);
    textSize(blockHeight);
    text("Press Space to Start a New Game!", width / 2, height * 3 / 4);
  }
}

// Space to drop block
function keyReleased() {
  // Space key
  if (key === " ") {
    if (menuState === statePlaying) {
      placeBlock(); // Locks current block in place
    }
    else {
      newGame();
      menuState = statePlaying;
    }
  }
}

// Block Attributes
function newGame() {
  currentBlock = createVector(0, height - blockHeight / 2, blockWidth);
  blockDirection = 1;
  blockSpeed = 2;
  placedBlocks = []; // Reset placed blocks
}

// Block Direction
function updateBlock() {
  currentBlock.x += blockDirection * blockSpeed;
  if (currentBlock.x < 0) {
    blockDirection = 1;
  }
  if (currentBlock.x + currentBlock.z > width) {
    blockDirection = -1;
  }
}

// Drawing the blocks
function drawBlocks() {
  image(wood, currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  noFill();
  noStroke();
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  fill(50);
  for (let block of placedBlocks) { // Loop through array
    image(wood, block.x, block.y, block.z, blockHeight);
    noFill();
    noStroke();
    rect(block.x, block.y, block.z, blockHeight);
  }
  text(placedBlocks.length, blockHeight, blockHeight); // Shows stack height as number
}

// Placing blocks (array usage)
function placeBlock() {
  let prevBlock = placedBlocks[placedBlocks.length - 1]; // Get last block
  let newWidth = blockWidth;

  if (prevBlock) {
    // Convert centers to edges
    let prevLeft = prevBlock.x - prevBlock.z / 2;
    let prevRight = prevBlock.x + prevBlock.z / 2;
    let currLeft = currentBlock.x - currentBlock.z / 2;
    let currRight = currentBlock.x + currentBlock.z / 2;

    // Calculate overlap
    let leftEdge = max(prevLeft, currLeft);
    let rightEdge = min(prevRight, currRight);
    newWidth = rightEdge - leftEdge;

    if (newWidth <= 0) {
      menuState = stateLose; // Player loses if no overlap
      return;
    }

    // Convert edges back to center
    currentBlock.x = leftEdge + newWidth / 2;
    currentBlock.z = newWidth;
  }

  placedBlocks.push(currentBlock); // Add block to array
  blockSpeed *= 1.05; // Increase speed slightly
  newBlock(newWidth); // Spawn next block
}

// Spawning the new block
function newBlock(newWidth) {
  let blockStackHeight = placedBlocks.length * blockHeight;
  let yPos = height - blockHeight / 2 - blockStackHeight;

  if (yPos < 0) {
    menuState = stateWin; // player wins if stack reaches top
    return;
  }

  currentBlock = createVector(0, yPos, newWidth); // New moving block
}

// Ability to resize window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}