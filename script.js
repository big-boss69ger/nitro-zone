const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Game variables
let car = { x: 375, y: 500, width: 50, height: 100, speed: 5 };
let obstacles = [];
let nitros = [];
let score = 0;
let gameSpeed = 2;

// Key controls
let keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Functions
function drawCar() {
  ctx.fillStyle = "blue";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function spawnObstacle() {
  const x = Math.random() * (canvas.width - 50);
  obstacles.push({ x, y: -50, width: 50, height: 50 });
}

function spawnNitro() {
  const x = Math.random() * (canvas.width - 20);
  nitros.push({ x, y: -20, width: 20, height: 20 });
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach((obs) => {
    obs.y += gameSpeed;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function drawNitros() {
  ctx.fillStyle = "green";
  nitros.forEach((nitro) => {
    nitro.y += gameSpeed;
    ctx.fillRect(nitro.x, nitro.y, nitro.width, nitro.height);
  });
}

function update() {
  // Move car
  if (keys["ArrowLeft"] && car.x > 0) car.x -= car.speed;
  if (keys["ArrowRight"] && car.x < canvas.width - car.width) car.x += car.speed;

  // Check collisions
  obstacles.forEach((obs, index) => {
    if (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    ) {
      alert("Game Over! Final Score: " + score);
      document.location.reload();
    }
  });

  nitros.forEach((nitro, index) => {
    if (
      car.x < nitro.x + nitro.width &&
      car.x + car.width > nitro.x &&
      car.y < nitro.y + nitro.height &&
      car.y + car.height > nitro.y
    ) {
      nitros.splice(index, 1);
      gameSpeed += 1;
      score += 10;
    }
  });

  // Update score
  score += 1;
  document.getElementById("score").innerText = `Score: ${score}`;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacles();
  drawNitros();
  update();

  if (Math.random() < 0.02) spawnObstacle();
  if (Math.random() < 0.01) spawnNitro();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
