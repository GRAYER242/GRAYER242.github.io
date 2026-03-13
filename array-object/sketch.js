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

// Backround
let sky;
let wood;

function preload() {
  sky = loadImage("Sky.jpg");
  wood = loadImage("Wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  newGame();
}

// State variables
function draw() {
  background(220);
  image(sky, width/2, height/2, windowWidth, windowHeight);

  // Playing
  if (menuState === statePlaying) {
    textSize(blockHeight);
    updateBlock();
    drawBlocks();
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
      placeBlock();
    }
    else {
      newGame();
      menuState = statePlaying;
    }
  }
}

// Block Attributes
function newGame() {
  currentBlock = createVector(0, height - blockHeight, blockWidth);
  blockDirection = 1;
  blockSpeed = 2;
  placedBlocks = [];
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
  for (let block of placedBlocks) {
    rect(block.x, block.y, block.z, blockHeight);
  }
  text(placedBlocks.length, blockHeight, blockHeight);
}

// Placing blocks (array usage)
function placeBlock() {
  let prevBlock = placedBlocks[placedBlocks.length - 1];
  let newWidth = blockWidth;

  if (prevBlock) {
    let leftEdge = max(prevBlock.x, currentBlock.x);
    let rightEdge = min(prevBlock.x + prevBlock.z, currentBlock.x + currentBlock.z);

    newWidth = rightEdge - leftEdge;

    currentBlock.x = leftEdge;
    currentBlock.z = newWidth;
  }

  if (newWidth < 0) {
    menuState = stateLose;
    return;
  }

  placedBlocks.push(currentBlock);
  blockSpeed *= 1.065;
  newBlock(newWidth);
}

// Spawning the new block
function newBlock(newWidth) {
  let blockStackHeight = (placedBlocks.length + 1) * blockHeight;

  if (blockStackHeight > height) {
    menuState = stateWin;
    return;
  }

  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}

// Ability to resize window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}