import {
  gridWidth,
  gridHeight,
  cellWidthPx,
  cellHeightPx,
  colorClasses,
} from './config.js';

/** @type {HTMLDivElement} */
const mainContainer = document.querySelector('#game_grid');

/**
 * @param {string} [className='']
 * @returns {HTMLDivElement} newly created cell
 */
function createCell(className = '') {
  const cell = document.createElement('div');
  cell.className = className;
  cell.style.width = `${cellWidthPx}px`;
  cell.style.height = `${cellHeightPx}px`;
  return cell;
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {Element}
 */
function getCell(x, y) {
  const cellIndex = x + y * gridWidth;
  const cell = mainContainer.childNodes[cellIndex];
  if (cell instanceof Element) {
    return cell;
  }
  return null;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} className
 */
function setCellClass(x, y, className) {
  const cell = getCell(x, y);
  if (!cell) {
    return;
  }
  cell.className = className;
}

/**
 * Returns random coordinates
 * @returns {{x:number, y:number}}
 */
function getRandomCell() {
  const x = Math.floor(Math.random() * gridWidth);
  const y = Math.floor(Math.random() * gridHeight);
  return { x, y };
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function getCellClass(x, y) {
  const cell = getCell(x, y);
  if (!cell) {
    return '';
  }
  return cell.className;
}

function assignColorClass(x, y) {
  let colorClass = colorClasses.grass;

  if (y === 0
    || x === 0
    || x === gridWidth - 1
    || y === gridHeight - 1
  ) {
    colorClass = colorClasses.wall;
  }

  return colorClass;
}

function reduceBrightness(x, y, cell) {
  if (cell.className === 'wall') return;

  if (((x % 2) && !(y % 2))
      || (!(x % 2) && (y % 2))
  ) {
    // eslint-disable-next-line no-param-reassign
    cell.style.filter = 'brightness(0.95)';
  }
}

const createGrid = function () {
  mainContainer.style.width = `${gridWidth * cellWidthPx}px`;
  mainContainer.style.height = `${gridHeight * cellHeightPx}px`;

  for (let y = 0; y < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      const cellClass = assignColorClass(x, y);

      const cell = createCell(cellClass);
      reduceBrightness(x, y, cell);

      mainContainer.appendChild(cell);
    }
  }
};

const removeGrid = function () {
  if (mainContainer) {
    mainContainer.innerHTML = null;
  }
};

export {
  createGrid,
  removeGrid,
  setCellClass,
  getCellClass,
  getRandomCell,
};
