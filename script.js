const canvas = document.getElementById('boids-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const initialNumberOfBoids = document.getElementById("numberOfBoids").value;
let flock = [];
const wallPadding = 0;

const fpsDisplay = document.getElementById("fps-display");
let fpsCount = 0;
let lastTimestamp = performance.now();
const targetFPS = 60;
const targetFrameTime = 1000 / targetFPS;

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

function draw(timestamp) {
  const elapsed = timestamp - lastTimestamp;

  if (elapsed >= targetFrameTime) {
    fpsCount++;
    lastTimestamp = timestamp;

    const fps = (fpsCount * 1000) / elapsed;
    fpsDisplay.textContent = `FPS: ${fps.toFixed(0)}`;
    fpsCount = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const boid of flock) {
      boid.move();
      boid.drawOnCanvas();
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setup(initialNumberOfBoids);