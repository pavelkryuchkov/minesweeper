import Cell from '../Cell/Cell';
import styles from './styles.module.css';

const CELL_SIZE = {
  small: '30px',
  medium: '32px',
  large: '45px',
};

function Board({
  field,
  handleClick,
  handleDoubleClick,
  handleRightClick,
  isDark,
}) {
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
              key={colNum}
              cell={cell}
              handleClick={handleClick}
              handleDoubleClick={handleDoubleClick}
              handleRightClick={handleRightClick}
              size={cellSize}
              isDark={isDark}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
