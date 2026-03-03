// Ball Object Array

let ballarray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let ball of ballarray) {
    // move
    ball.x += ball.dx;
    ball.y += ball.dy;

    //display
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function mousePressed() {
  spawnball();
}

function spawnball() {
  let theBall = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
  };
  ballarray.push(theBall);
}