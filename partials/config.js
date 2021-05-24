export const gridWidth = 40;
export const gridHeight = 25;
export const cellWidthPx = 20;
export const cellHeightPx = 20;

export const colorClasses = {
  wall: 'wall',
  grass: 'grass',
  snake: 'snake',
  fruit: 'fruit',
};

export const moveDirection = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
};

export const keyboardMap = {
  ArrowUp: moveDirection.up,
  ArrowDown: moveDirection.down,
  ArrowLeft: moveDirection.left,
  ArrowRight: moveDirection.right,
};

export const gameData = {
  score: 0,
  highScore: 0,
  isPaused: false,
  snakeSpeed: 300,
  startDirection: 'right',
};
