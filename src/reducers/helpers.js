function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createEmptyField(width, height) {
  const result = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const cell = {
        value: 0,
        isOpen: false,
        isFlagged: false,
        isErrorBomb: false,
        isErrorFlag: false,
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

function addBombs(field, bombsCount, [excludeRow, excludeCol]) {
  const newField = copyField(field);
  const height = newField.length;
  const width = newField[0].length;
  const neighbors = getNeighbors(newField[excludeRow][excludeCol], newField);
  const exclude = neighbors
    .map((cell) => cell.row * width + cell.col)
    .concat(excludeRow * width + excludeCol);
  const bombs = [];

  while (bombs.length < bombsCount) {
    const newBomb = getRandomInt(width * height);
    if (!bombs.includes(newBomb) && !exclude.includes(newBomb)) {
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

function openBombs(field) {
  const height = field.length;
  const width = field[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const cell = field[i][j];
      if (cell.value === 'bomb' && !cell.isFlagged) {
        cell.isOpen = true;
      }
    }
  }
  return field;
}

function openCell(field, row, col) {
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
  } else if (newField[row][col].value === 'bomb') {
    openBombs(newField);
    newField[row][col].isErrorBomb = true;
  } else {
    newField[row][col].isOpen = true;
  }
  return newField;
}

function openCellsAround(field, row, col) {
  if (!field[row][col].isOpen) {
    return;
  }
  const newField = copyField(field);
  const cell = newField[row][col];
  const neighbors = getNeighbors(cell, newField);
  const flaggedCells = neighbors.filter((cell) => cell.isFlagged);
  if (flaggedCells.length !== cell.value) {
    return newField;
  }
  for (const cell of neighbors) {
    if (cell.value === 'bomb' && !cell.isFlagged) {
      cell.isErrorBomb = true;
      openBombs(newField);
    } else if (cell.value !== 'bomb' && cell.isFlagged) {
      cell.isErrorFlag = true;
    }
  }
  const cellsToOpen = neighbors.filter(
    (cell) => !cell.isFlagged && !cell.isOpen
  );
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
  addBombs,
  checkGameStatus,
  copyField,
  createEmptyField,
  getNeighbors,
  openCell,
  openCellsAround,
};

// let field = createFieldArray(5, 5);
// let newField = addBombs(field, 5, [0, 0]);
// console.log(field);
// console.log(newField);
