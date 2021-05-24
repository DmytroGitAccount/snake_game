/* eslint-disable default-case */
import {
  gameData,
  gridWidth,
  gridHeight,
  createGrid,
  removeGrid,
  keyboardMap,
  colorClasses,
  getCellClass,
  setCellClass,
  moveDirection,
  getRandomCell,
} from './partials/index.js';

let snake;
const displayScore = document.querySelector('#score');
const gameOverMenu = document.querySelector('#game_over');
const highScoreBoard = document.querySelector('#high_score');
const gamePausedMenu = document.querySelector('#game_paused');

function addApple() {
  let randomCords;
  let randomCellClass;

  do {
    randomCords = getRandomCell(gridWidth, gridHeight);

    const { x, y } = randomCords;
    randomCellClass = getCellClass(x, y);
  } while (randomCellClass !== colorClasses.grass);

  const { x, y } = randomCords;
  setCellClass(x, y, colorClasses.fruit);
}

function gameOver() {
  gameData.isPaused = true;
  gameOverMenu.hidden = false;
  gameData.highScore = gameData.score;
  displayScore.textContent = gameData.score;
  highScoreBoard.innerText = gameData.highScore;
}

function updateCurrentScore() {
  const scoreBoard = document.querySelector('#current_score');

  scoreBoard.innerText = gameData.score;
}

function init() {
  gameData.score = 0;
  gameData.snakeSpeed = 300;
  snake = {
    cells: [
      { x: 10, y: 10 },
    ],
    targetLength: 1,
    direction: gameData.startDirection,
    getHead() {
      return this.cells[0];
    },
    getAndTrimTail() {
      return this.cells.pop();
    },
    getNewHeadPosition() {
      const newHeadPosition = {
        ...this.getHead(),
      };
      switch (this.direction) {
        case moveDirection.right:
          newHeadPosition.x += 1;
          break;
        case moveDirection.up:
          newHeadPosition.y -= 1;
          break;
        case moveDirection.down:
          newHeadPosition.y += 1;
          break;
        case moveDirection.left:
          newHeadPosition.x -= 1;
          break;
      }

      return newHeadPosition;
    },
  };
  createGrid();
  updateCurrentScore();

  snake.cells.forEach((cell) => {
    setCellClass(cell.x, cell.y, colorClasses.snake);
  });
  addApple();
}

function doGameStep() {
  if (gameData.isPaused) {
    return;
  }

  const newHeadPosition = snake.getNewHeadPosition();
  const { x, y } = newHeadPosition;
  const obstacle = getCellClass(x, y);

  setTimeout(doGameStep, gameData.snakeSpeed);
  switch (obstacle) {
    case colorClasses.grass:
      break;
    case colorClasses.fruit:
      gameData.score += 10;
      if (gameData.snakeSpeed > 50) {
        gameData.snakeSpeed -= 10;
      }
      updateCurrentScore();
      snake.targetLength += 1;
      addApple();
      break;
    case colorClasses.snake:
      gameOver();
      return;
    default:
      gameOver();
  }

  snake.cells.unshift(newHeadPosition);
  setCellClass(x, y, colorClasses.snake);

  if (snake.targetLength < snake.cells.length) {
    const tail = snake.getAndTrimTail();
    setCellClass(tail.x, tail.y, colorClasses.grass);
  }
}

function playAgain() {
  removeGrid();
  init();
  gameOverMenu.hidden = true;
  gameData.isPaused = false;
  doGameStep();
}

function playOrExit(event) {
  if (event.target.classList.contains('green')) {
    playAgain();
  }
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  const direction = keyboardMap[event.key];
  const currentDirection = snake.direction;

  if (direction) {
    switch (currentDirection) {
      case 'up':
        if (direction === 'down') return;
        snake.direction = direction;
        break;
      case 'down':
        if (direction === 'up') return;
        snake.direction = direction;
        break;
      case 'right':
        if (direction === 'left') return;
        snake.direction = direction;
        break;
      case 'left':
        if (direction === 'right') return;
        snake.direction = direction;
        break;
    }
  }

  switch (event.key) {
    case ' ':
      gameData.isPaused = !gameData.isPaused;
      if (!gameData.isPaused) {
        gamePausedMenu.hidden = true;
        doGameStep();
        return;
      }
      gamePausedMenu.hidden = false;
  }
}

function main() {
  init();

  window.addEventListener('keydown', handleKeyDown);
  gameOverMenu.addEventListener('click', playOrExit);

  doGameStep();
}

window.addEventListener('load', main);
