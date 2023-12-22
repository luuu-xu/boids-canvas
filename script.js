const canvas = document.getElementById('boidsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfBoids = 500;
const flock = [];
const wallPadding = 0;

function setup() {
  for (let i = 0; i < numberOfBoids; i++) {
    flock.push(new Boid());
  }

  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const boid of flock) {
    boid.move();
    boid.drawOnCanvas();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setup();