// Arrays and Object Notation Assignment
// Grayer Hardy
// 3/9/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function Particle(){
  let options = {
    restitution: 0.5,
    friction: 0,
    density: 1
  };

  x += random(-1,1);
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "particle";
  this.r = r;

}

Particle.prototype.isOffScreen = functio(); {
  let x = this.body.position.x;
  let y = this.body.position.y;
}