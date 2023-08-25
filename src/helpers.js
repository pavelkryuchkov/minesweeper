function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getNeighbors(cell, field) {
  const neighbors = [];
  for (const rowShift of [-1, 0, 1]) {
    const rowIndex = cell.row + rowShift;
    for (const colShift of [-1, 0, 1]) {
      const colIndex = cell.col + colShift;
      if (
        rowIndex >= 0 &&
        rowIndex < field.length &&
        colIndex >= 0 &&
        colIndex < field[0].length &&
        (rowShift !== 0 || colShift !== 0)
      ) {
        neighbors.push(field[rowIndex][colIndex]);
      }
    }
  }
  return neighbors;
}

function createFieldArray(width, height) {
  const result = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const cell = {
        value: 0,
        isOpen: false,
        isFlagged: false,
        row: i,
        col: j,
      };

      row.push(cell);
    }
    result.push(row);
  }

  return result;
}

function copyField(field) {
  const height = field.length;
  const width = field[0].length;
  const result = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const cell = { ...field[i][j] };
      row.push(cell);
    }
    result.push(row);
  }

  return result;
}

function addBombs(field, bombsCount, [excludeRow, excludeCol]) {
  const newField = copyField(field);
  const height = newField.length;
  const width = newField[0].length;
  const bombs = [];

  while (bombs.length < bombsCount) {
    const newBomb = getRandomInt(width * height);
    if (
      !bombs.includes(newBomb) &&
      newBomb !== excludeRow * width + excludeCol
    ) {
      bombs.push(newBomb);
      const cell = newField[Math.floor(newBomb / width)][newBomb % width];
      cell.value = 'bomb';
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const cell = newField[i][j];
      if (cell.value !== 'bomb') {
        const neighbors = getNeighbors(cell, newField);
        const bombsNumber = neighbors.reduce(
          (res, { row, col }) =>
            newField[row][col].value === 'bomb' ? res + 1 : res,
          0
        );
        cell.value = bombsNumber;
      }
    }
  }

  return newField;
}

function openFieldCell(field, row, col) {
  const newField = copyField(field);
  if (newField[row][col].value === 0) {
    let cells = [newField[row][col]];
    while (cells.length > 0) {
      const cell = cells.pop();
      if (!cell.isOpen && !cell.isFlagged) {
        cell.isOpen = true;
        if (cell.value === 0) {
          const newCells = getNeighbors(cell, newField);
          for (const newCell of newCells) {
            if (!cells.includes(newCell) && !newCell.isOpen) {
              cells.push(newCell);
            }
          }
        }
      }
    }
  } else {
    newField[row][col].isOpen = true;
  }
  return newField;
}

function openCells(field, cells) {
  const newField = copyField(field);
  const cellsToOpen = cells.map((cell) => newField[cell.row][cell.col]);
  while (cellsToOpen.length > 0) {
    const cell = cellsToOpen.pop();
    if (!cell.isOpen && !cell.isFlagged) {
      cell.isOpen = true;
      if (cell.value === 0) {
        const newCells = getNeighbors(cell, newField);
        for (const newCell of newCells) {
          if (!cellsToOpen.includes(newCell) && !newCell.open) {
            cellsToOpen.push(newCell);
          }
        }
      }
    }
  }
  return newField;
}

function checkGameStatus(field) {
  let wonFlag = true;
  for (const row of field) {
    for (const cell of row) {
      if (cell.isOpen && cell.value === 'bomb') {
        return 'lost';
      } else if (!cell.isOpen && cell.value !== 'bomb') {
        wonFlag = false;
      }
    }
  }
  if (wonFlag) {
    return 'won';
  }
  return null;
}

export {
  createFieldArray,
  copyField,
  getNeighbors,
  addBombs,
  openFieldCell,
  openCells,
  checkGameStatus,
};

// let field = createFieldArray(5, 5);
// let newField = addBombs(field, 5, [0, 0]);
// console.log(field);
// console.log(newField);
