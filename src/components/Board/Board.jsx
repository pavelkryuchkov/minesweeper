import { useCallback, useState } from 'react';
import { getNeighbors } from '../../helpers';
import Cell from '../Cell/Cell';
import styles from './styles.module.css';

const CELL_SIZE = {
  small: '30px',
  medium: '32px',
  large: '45px',
};

function Board({ dispatchBoardAction, field, isDark }) {
  const [selectedCells, setSelectedCells] = useState([]);

  const handleMouseDown = useCallback((event, cell) => {
    if (cell.isFlagged) {
      return;
    }
    if (event.buttons === 1) {
      setSelectedCells([cell]);
    } else if (event.buttons === 3) {
      const neighbors = getNeighbors(cell, field);
      const newCells = neighbors.filter(
        (cell) => !cell.isFlagged && !cell.isOpen
      );
      setSelectedCells(newCells.concat(cell));
    }
    document.body.addEventListener(
      'mouseup',
      () => {
        setSelectedCells([]);
      },
      { once: true }
    );
  });

  const fieldWidth = field[0].length;
  const cellSize =
    fieldWidth < 16
      ? CELL_SIZE.large
      : fieldWidth < 30
      ? CELL_SIZE.medium
      : CELL_SIZE.small;

  return (
    <div className={styles.board}>
      {field.map((row, rowNum) => (
        <div key={rowNum} className={styles.row}>
          {row.map((cell, colNum) => (
            <Cell
              cell={cell}
              dispatchBoardAction={dispatchBoardAction}
              handleMouseDown={handleMouseDown}
              isDark={isDark}
              isSelected={selectedCells.includes(cell)}
              key={colNum}
              size={cellSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
