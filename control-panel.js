const updateNumBoids = debounce(function(value) {
  const numBoids = parseInt(value);
  const maxSpeed = document.getElementById("boidSpeed").value;
  const directionChangeFactor = document.getElementById("directionChangeFactor").value;
  const perceptionRadius = document.getElementById("perceptionRadius").value;
  const separationRadius = document.getElementById("separationRadius").value;

  setup(numBoids, maxSpeed, directionChangeFactor, perceptionRadius, separationRadius);
}, 500);

const updateMaxSpeed = debounce(function(value) {
  const maxSpeed = parseInt(value);
  for (const boid of flock) {
    boid.maxSpeed = maxSpeed;
  }
}, 500);

const updateDirectionChangeFactor = debounce(function(value) {
  const directionChangeFactor = parseFloat(value);
  for (const boid of flock) {
    boid.directionChangeFactor = directionChangeFactor;
  }
}, 500);

const updatePerceptionRadius = debounce(function(value) {
  const perceptionRadius = parseInt(value);
  for (const boid of flock) {
    boid.perceptionRadius = perceptionRadius;
  }
}, 500);

const updateSeparationRadius = debounce(function(value) {
  const separationRadius = parseInt(value);
  for (const boid of flock) {
    boid.separationRadius = separationRadius;
  }
}, 500);

document.getElementById("numberOfBoids").addEventListener("input", () => {
  updateNumBoids(document.getElementById("numberOfBoids").value);
});

document.getElementById("boidSpeed").addEventListener("input", () => {
  updateMaxSpeed(document.getElementById("boidSpeed").value);
});

document.getElementById("directionChangeFactor").addEventListener("input", () => {
  updateDirectionChangeFactor(document.getElementById("directionChangeFactor").value);
});

document.getElementById("perceptionRadius").addEventListener("input", () => {
  updatePerceptionRadius(document.getElementById("perceptionRadius").value);
});

document.getElementById("separationRadius").addEventListener("input", () => {
  updateSeparationRadius(document.getElementById("separationRadius").value);
});

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

document.getElementById("btn-open").addEventListener("click", () => {
  const controls = document.getElementById("controls");
  controls.className = "visible";

  const btnOpen = document.getElementById("btn-open");
  const btnClose = document.getElementById("btn-close");

  btnOpen.className = "hidden";
  btnClose.className = "visible";
});

document.getElementById("btn-close").addEventListener("click", () => {
  const controls = document.getElementById("controls");
  controls.className = "hidden";

  const btnOpen = document.getElementById("btn-open");
  const btnClose = document.getElementById("btn-close");

  btnOpen.className = "visible";
  btnClose.className = "hidden";
});