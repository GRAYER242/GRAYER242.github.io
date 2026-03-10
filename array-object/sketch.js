// Arrays and Object Notation Assignment
// Grayer Hardy
// 3/9/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let blockWidth = 300;
let blockHeight = 30;
let currentBlock;
let blockDirection;
let blockSpeed;
let placedBlocks = [];
let statePlaying = "playing";
let stateLose = "lose";
let stateWin = "win";
let menuState = statePlaying;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  newGame();
}

function draw() {
  background(220);
  if (menuState === statePlaying) {
    textSize(blockHeight);
    updateBlock();
    drawBlocks();
  }
  else if (menuState === stateLose) {
    textSize(blockHeight * 2);
    fill(255, 0, 0);
    text("Sorry, you lost :,(", width / 2, height / 2);
    textSize(blockHeight);
    text("Press space to start a new game!", width / 2, height * 3 / 4);
  }
  else if (menuState === stateWin) {
    textSize(blockHeight * 2);
    fill(0, 255, 0);
    text("Congrats, you won!", width / 2, height / 2);
    textSize(blockHeight);
    text("Press space to start a new game!", width / 2, height * 3 / 4);
  }
}

function keyReleased() {
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

function newGame() {
  currentBlock = createVector(0, height - blockHeight, blockWidth);
  blockDirection = 1;
  blockSpeed = 2;
  placedBlocks = [];
}

function updateBlock() {
  currentBlock.x += blockDirection * blockSpeed;
  if (currentBlock.x < 0) {
    blockDirection = 1;
  }
  if (currentBlock.x + currentBlock.z > width) {
    blockDirection = -1;
  }
}

function drawBlocks() {
  fill(255, 0, 0);
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  fill(50);
  for (let block of placedBlocks) {
    rect(block.x, block.y, block.z, blockHeight);
  }
  text(placedBlocks.length, blockHeight, blockHeight);
}

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
  blockSpeed *= 1.1;
  newBlock(newWidth);
}

function newBlock(newWidth) {
  let blockStackHeight = (placedBlocks.length + 1) * blockHeight;

  if (blockStackHeight > height) {
    menuState = stateWin;
    return;
  }

  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}