const n = 20;
let iterationCount = 0;
// Update the iteration count in the HTML
function updateIterationCount() {
  iterationCount++;
  document.getElementById("iteration-count").textContent = iterationCount;
}

// Create the grid
const grid = document.getElementById("grid");
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
}
const cells = grid.querySelectorAll(".cell");

// Add event listeners for buttons
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", start);
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stop);
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clear);

// Add event listeners for cells
cells.forEach((cell) => cell.addEventListener("click", toggleCell));

// Variables for animation
let animationId;
let isRunning = false;

// Game of Life function
function gameOfLife() {
  const newState = Array.from(cells, (cell) =>
    cell.classList.contains("alive")
  );
  cells.forEach((cell, i) => {
    const neighbors = getLiveNeighbors(i);
    if (cell.classList.contains("alive")) {
      if (neighbors < 2 || neighbors > 3) newState[i] = false;
    } else {
      if (neighbors === 3) newState[i] = true;
    }
  });
  cells.forEach((cell, i) => {
    if (newState[i]) cell.classList.add("alive");
    else cell.classList.remove("alive");
  });
  updateIterationCount();
}

// Get the number of live neighbors for a cell
function getLiveNeighbors(i) {
  const x = i % n;
  const y = Math.floor(i / n);
  let liveNeighbors = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
        const neighbor = cells[nx + ny * n];
        if (neighbor.classList.contains("alive")) liveNeighbors++;
      }
    }
  }
  return liveNeighbors;
}

// Start the animation
function start() {
  isRunning = true;
  animationId = setInterval(gameOfLife, 100);
  startButton.setAttribute("disabled", "true");
  stopButton.removeAttribute("disabled");
}

// Stop the animation
function stop() {
  isRunning = false;
  clearInterval(animationId);
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", "true");
}

// Clear the grid
function clear() {
  stop();
  cells.forEach((cell) => cell.classList.remove("alive"));
  iterationCount = 0;
  document.getElementById("iteration-count").textContent = iterationCount;
}

// Toggle the state of a cell
function toggleCell() {
  this.classList.toggle("alive");
}
