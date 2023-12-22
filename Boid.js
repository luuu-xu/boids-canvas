class Boid {
  constructor() {
    this.maxSpeed = 5;
    this.avoidWallsDistance = 50;
    this.directionChangeFactor = 0.5;
    this.initialDirectionChangeTimer = Math.random() * 300 + 100;
    this.directionChangeTimer = this.initialDirectionChangeTimer;
    this.perceptionRadius = 50;
    this.separationRadius = 15;

    this.position = {
      x: Math.random() * (canvas.width - wallPadding * 2) + wallPadding,
      y: Math.random() * (canvas.height - wallPadding * 2) + wallPadding,
    };
    this.velocity = {
      x: getRandomNumberFromRange(-1, 1) * this.maxSpeed,
      y: getRandomNumberFromRange(-1, 1) * this.maxSpeed,
    };

    this.triangleSize = 8;
    this.triangleColor = "#000";
  }

  bounceFromWalls() {
    if (this.position.x > canvas.width - wallPadding) {
      this.position.x = canvas.width - wallPadding;
      this.velocity.x *= -1;
    }
    if (this.position.x < wallPadding) {
      this.position.x = wallPadding;
      this.velocity.x *= -1;
    }
    if (this.position.y > canvas.height - wallPadding) {
      this.position.y = canvas.height - wallPadding;
      this.velocity.y *= -1;
    }
    if (this.position.y < wallPadding) {
      this.position.y = wallPadding;
      this.velocity.y *= -1;
    }
  }

  avoidFromWalls() {
    const steer = { x: 0, y: 0 };
    const combinedDistance = wallPadding + this.avoidWallsDistance;

    if (this.position.x < combinedDistance) {
      steer.x += (combinedDistance - this.position.x) / this.avoidWallsDistance;
    } else if (this.position.x > canvas.width - combinedDistance) {
      steer.x -= (this.position.x - (canvas.width - combinedDistance)) / this.avoidWallsDistance;
    }

    if (this.position.y < combinedDistance) {
      steer.y += (combinedDistance - this.position.y) / this.avoidWallsDistance;
    } else if (this.position.y > canvas.height - combinedDistance) {
      steer.y -= (this.position.y - (canvas.height - combinedDistance)) / this.avoidWallsDistance;
    }

    this.velocity.x += steer.x;
    this.velocity.y += steer.y;
  }

  changeDirectionRandomly() {
    this.directionChangeTimer --;

    if (this.directionChangeTimer <= 0) {
      const newVelocity = {
        x: getRandomNumberFromRange(-1, 1) * this.maxSpeed,
        y: getRandomNumberFromRange(-1, 1) * this.maxSpeed
      };

      this.directionChangeTimer = this.initialDirectionChangeTimer;

      this.velocity.x += (newVelocity.x - this.velocity.x) * this.directionChangeFactor;
      this.velocity.y += (newVelocity.y - this.velocity.y) * this.directionChangeFactor;
    }
  }

  align(boids) {
    let averageVelocity = { x: 0, y: 0 };
    let total = 0;

    for (const other of boids) {
      const distance = calculateDistance(
        this.position.x, this.position.y, 
        other.position.x, other.position.y
      );
      
      if (other !== this && distance < this.perceptionRadius) {
        averageVelocity.x += other.velocity.x;
        averageVelocity.y += other.velocity.y;
        total ++;
      }
    }

    if (total > 0) {
      averageVelocity.x /= total;
      averageVelocity.y /= total;

      normalizeVector(averageVelocity);
    }

    return averageVelocity;
  }

  cohesion(boids) {
    let centerOfMass = { x: 0, y: 0 };
    let total = 0;

    for (const other of boids) {
      const distance = calculateDistance(
        this.position.x, this.position.y, 
        other.position.x, other.position.y
      );

      if (other !== this && distance < this.perceptionRadius) {
        centerOfMass.x += other.position.x;
        centerOfMass.y += other.position.y;
        total ++;
      }
    }

    if (total > 0) {
      centerOfMass.x /= total;
      centerOfMass.y /= total;

      const cohesionForce = {
        x: centerOfMass.x - this.position.x,
        y: centerOfMass.y - this.position.y
      };

      normalizeVector(cohesionForce);

      return cohesionForce;
    }

    // No cohesion force since there are no nearby boids
    return { x: 0, y: 0 };
  }

  separation(boids) {
    const separationForce = { x: 0, y: 0 };
  
    for (const other of boids) {
      const distance = calculateDistance(
        this.position.x, this.position.y,
        other.position.x, other.position.y
      );
  
      if (other !== this) {
        const combinedSeparationRadius = this.separationRadius + other.separationRadius;
  
        if (distance < combinedSeparationRadius) {
          const diffX = this.position.x - other.position.x;
          const diffY = this.position.y - other.position.y;
  
          const separationFactor = Math.exp(-(distance - this.separationRadius) / this.separationRadius);
  
          separationForce.x += (diffX / distance) * separationFactor;
          separationForce.y += (diffY / distance) * separationFactor;
        }
      }
    }
  
    return separationForce;
  }

  limitSpeed() {
    const speed = calculateHypotenuse(this.velocity.x, this.velocity.y);

    if (speed > this.maxSpeed) {
      const factor = this.maxSpeed / speed;
      this.velocity.x *= factor;
      this.velocity.y *= factor;
    }
  }

  getBoidsInPerception() {
    const boidsInPerception = flock.filter(boid => 
      calculateDistance(
        this.position.x, this.position.y, 
        boid.position.x, boid.position.y
      ) < this.perceptionRadius
    );

    return boidsInPerception;
  }

  boidsAlgorithm() {
    const boidsInPerception = this.getBoidsInPerception();

    const alignment = this.align(boidsInPerception);
    const cohesion = this.cohesion(boidsInPerception);
    const separation = this.separation(boidsInPerception);

    this.velocity.x += alignment.x + cohesion.x + separation.x;
    this.velocity.y += alignment.y + cohesion.y + separation.y;
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  move() {
    this.changeDirectionRandomly();

    this.boidsAlgorithm();
    
    this.limitSpeed();
    
    this.avoidFromWalls();

    this.updatePosition();
  }

  drawOnCanvas() {
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    const size = this.triangleSize;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size / 2, size / 2);
    ctx.lineTo(-size / 2, -size / 2);
    ctx.closePath();

    ctx.fillStyle = this.triangleColor;
    ctx.fill();

    ctx.restore();
  }
}

function getRandomNumberFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

function calculateDistance(x1, y1, x2, y2) {
  return calculateHypotenuse(x1 - x2, y1 - y2);
}

function normalizeVector(vector) {
  const magnitude = calculateHypotenuse(vector.x, vector.y);

  if (magnitude > 0) {
    vector.x /= magnitude;
    vector.y /= magnitude;
  }

  return vector;
}