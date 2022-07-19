const defaultSize = 16;
const minSize = 1;
const maxSize = 100;
const gridWidthPx = 300;
const borderGridWidthPx = 1;

let r = randomColor();
let g = randomColor();
let b = randomColor();

let rainbowEffect = false;
let changeColor = true;

const container = document.getElementById("container");
const newGridBtn = document.getElementById("new-grid-btn");

newGridBtn.addEventListener("click", userGrid);

window.addEventListener("mouseover", (event) => hoverEffect(event));

function clearGrid() {
  const listDiv = document.querySelectorAll(".square");
  listDiv.forEach((div) => container.removeChild(div));
}

function createGrid(size) {
  container.style.cssText = `border: ${borderGridWidthPx}px solid black`;
  container.style.width = `${gridWidthPx + borderGridWidthPx * 2}px`;
  container.style.height = `auto`;

  const gridSize = size * size;
  for (let i = 1; i <= gridSize; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");

    squareDiv.style.backgroundColor = 'white';
    squareDiv.style.width = `${gridWidthPx / size}px`;
    squareDiv.style.height = `${gridWidthPx / size}px`;

    container.appendChild(squareDiv);
  }
}

function userGrid() {
  let keepGoing = true;
  let userInput = "";
  while (keepGoing) {
    userInput = prompt(
      `How many squares per side? (max. ${maxSize})`,
      `${defaultSize}`
    );

    if (userInput === null) {
      return;
    }

    userInput = parseInt(userInput);
    if (!Number.isInteger(userInput)) {
      alert("Invalid input.");
      continue;
    }

    if (userInput < minSize || userInput > maxSize) {
      alert(`Size must be between ${minSize} and ${maxSize}.`);
      continue;
    }

    keepGoing = !keepGoing;

    clearGrid();
    createGrid(userInput);
  }
}

function hoverEffect(event) {
  const div = event.target;
  const isSquare = div.classList.contains("square");
  if (isSquare) {
    const bgColor = div.style.getPropertyValue("background-color");
    if (rainbowEffect) {
      r = randomColor();
      g = randomColor();
      b = randomColor();
    }
    if (bgColor === "" || changeColor) {
      div.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }
}

function randomColor() {
  const color = Math.floor(Math.random() * 256);
  return color;
}

createGrid(defaultSize);
