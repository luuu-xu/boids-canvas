const canvas = document.getElementById('boids-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const initialNumberOfBoids = document.getElementById("numberOfBoids").value;
let flock = [];
const wallPadding = 0;

function setup(
  numberOfBoids, 
  maxSpeed, 
  directionChangeFactor, 
  perceptionRadius, 
  separationRadius
) {
  flock = [];

  for (let i = 0; i < numberOfBoids; i++) {
    flock.push(new Boid(maxSpeed, directionChangeFactor, perceptionRadius, separationRadius));
  }

  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const boid of flock) {
    boid.move();
    boid.drawOnCanvas();
  }

  // const oneBoid = flock[0];
  // const speed = Math.sqrt(Math.pow(oneBoid.velocity.x, 2) + Math.pow(oneBoid.velocity.y, 2));
  // console.log(`Speed: ${speed}`);

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setup(initialNumberOfBoids);