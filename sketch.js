// THIS IS ALL BROKEN - NEED A WAY TO DISCARD STRAGGLERS THAT GO SLOW
// THEY ARE CURRENTLY THE ONLY ONES THAT ARE BEING SELECTED FOR EVOLUTION.

let evolutionCount = 0;
let vehicles = [];
let obstacles = [];
let startingTime = 30;
let timeRemaining = startingTime;

let trainingData = [];

function setup() {
  createCanvas(600, 600);

  resetSketch();
}

function generateObstacles() {
  let wallObstacle = new Obstacle(10, 10, 20, 50);

  obstacles.push([wallObstacle]);
}

// This is used for the evolution so that it has some random
// data to use to help evovle better in the event of selecting a
// suboptimal gened vehicle.
function generateRandomVehicles() {
  for (let i = 0; i < 10; i++) {
    let vehicle = new Vehicle(20, 300, 10);

    vehicle.velocity = createVector(random(), random());

    trainingData.push(vehicle);
  } 
}

function resetSketch() {
  timeRemaining = startingTime;

  generateObstacles();
  generateRandomVehicles();
  
  // Select 2 random vehicles from the trainingData to use as the 
  // dna parents for the next evolution.
  let training1 = trainingData[floor(random(0, trainingData.length - 1))];
  let training2 = trainingData[floor(random(0, trainingData.length - 1))];

  // Reset the training data so it can be repopulated later.
  trainingData = [];
  
  // console.log(training1);
  // console.log(training2);

  // These are to stop the velocity being 0.. :/
  if (training1.velocity.x == 0 || training1.velocity.y == 0) {
    training1.velocity = createVector(floor(random()), floor(random()));
  }

  if (training2.velocity.x == 0 || training2.velocity.y == 0) {
    training2.velocity = createVector(floor(random()), floor(random()));
  }

  // Need to use the data selected to generate some numbers to
  // use for the next generation.

  for (let i = 0; i < 100; i++) {
    let vehicle = new Vehicle(20, 300, 10);

    vehicle.velocity = createVector(random((training1.velocity.x + training2.velocity.x) / 2), random((training1.velocity.y + training2.velocity.y) / 2));

    vehicles.push(vehicle);
  }
  
  evolutionCount++;
}

// Display information relating to evolution, vehicle count, etc.
function displayInfo() {
  textSize(20);
  fill(100, 100, 100);
  push();
  text('Evolution: ' + evolutionCount, 20, 30);
  text('R Vehicles: ' + vehicles.length, 20, 50);
  text('R Time: ' + timeRemaining + 's', 20, 70);
  text('Elapsed: ' + millis() / 1000 + 's', 20, 90);
  pop();
}

// SHOULD HAVE A BAR THAT FOLLOWS BEHIND THE VEHICLES AND KILLS OFF THE STRAGGLERS.
function displayObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];

    obstacle.show();
  }
}

function timer() {
  if (frameCount % 60 == 0 && timeRemaining > 0) {
    timeRemaining--;
  }
}

function draw() {
  background(220);
  timer();

  // displayObstacles();
  
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];

    vehicle.update();
    vehicle.show();

    vehicle.detectCrash(true);
    vehicle.showAids(true);

    // Need to change this as being slow isnt necessarily a good thing.
    // Remove the vehicle from the sketch.
    if (vehicle.hasCrashed) {
      // Save the last 10 from each evolution.
      if (vehicles.length <= 10) {
        trainingData.push(vehicle);
      }

      // Delete the crashed vehicle.
      vehicles.splice(i, 1);
    }
  } 
  
  displayInfo();

  if (timeRemaining == 0) {
    vehicles = [];
    resetSketch();
  }

  // Once all vehicles crash then evolve and restart.
  if (vehicles.length == 0) {
    resetSketch();
  }
}
