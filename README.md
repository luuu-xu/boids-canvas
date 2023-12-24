Live: https://luuu-xu.github.io/boids-canvas/

# Boids Canvas

This is an implementation of Boids Algorithm simulating flock movements, on HTML Canvas.

## Boids Algorithm

[Boids Algorithm](https://en.wikipedia.org/wiki/Boids) developed by Craig Reynolds in 1986 is a smartly designed flocks simulating model that only uses 3 rules:

- Alignment

The steer force that each boid takes to align towards the average direction of the local flocks. 
In my implementation, the average velocity within local flocks is calculated and normalized, then added to boid's new velocity.

- Cohesion

The steer force that moves boid to the average position of the local flocks.
This rule is similarly implemented by calculating average position (center of mass) of local flocks, then the normalized velocity required to reach that average position is added.

- Separation

The steer force that each boid uses to avoid the local flocks.
The implementation is that the by setting a parameter called separationRadius, we fetch all boids within the radius, and add a separation force avoiding it, summed up to a new velocity.

## Simulating a Bird

These steps are actually the first steps.
Firstly I make boids to fly in a straight direction. Then a random direction changing behavior (after certain timeframe) is added to each boids.
Secondly, I added the ability for them to avoid from flying straight into walls, by adding a steer force that is gradually increasing as boids getting closer to the walls.
Now the boids look quite lively and real, but somehow their speed will increase to lighting fast. So a speed limit check is put on them with a maxSpeed parameter which can be adjusted.

## Drawing on Canvas

The simulation is done within [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element. It was interesting and fun to learn using Canvas as well!

## Control Panel

A simple control panel is added to the page where a user can adjust in real-time these five parameters:
  1. Number of Boids
  2. Maximum Speed
  3. Random Direction Changing Factor
  4. Perception Radius
  5. Separation Radius

Debounce functionality is added naturally when adjusting parameters to avoid multiple calls to events.

Adjusting the parameters give users a better understanding how efficient and elegant the algorithm is to simulate flocks.

## Additions to make

- [x] A control panel that has adjustable parameters: 

  1. Number of Boids
  2. Maximum Speed
  3. Random Direction Changing Factor
  4. Perception Radius
  5. Separation Radius

- [ ] Possibly add "Predator" into the flocks which flocks will avoid aggressively.

- [ ] Randomly assign different groups (colors) to boids, and make them attract to its own group, forming uniformly coloured flocks.