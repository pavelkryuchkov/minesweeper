import {
  openCellAction,
  openCellsAroundAction,
  putFlagAction,
} from '../../reducers/boardStateReducer';
import styles from './styles.module.css';

const COLORS = {
  1: 'blue',
  2: 'forestgreen',
  3: 'red',
  4: 'dodgerblue',
  5: 'brown',
  6: 'peru',
  7: 'deeppink',
  8: 'darkviolet',
};

function Cell({
  cell,
  dispatchBoardAction,
  handleMouseDown,
  isDark,
  isSelected,
  size,
}) {
  let style = {
    width: size,
    height: size,
  };
  let displayValue = '';
  if (cell.isOpen && cell.value !== 0 && cell.value !== 'bomb') {
    style.color = COLORS[cell.value];
    displayValue = cell.value;
  }

  let className = styles.cell;
  if (isDark) {
    className += ' ' + styles.cell_dark;
  }
  if (cell.isOpen || isSelected) {
    className += ' ' + styles.cell__open;
  }
  if ((cell.isOpen || isSelected) && isDark) {
    className += ' ' + styles.cell__open_dark;
  }
  if (cell.isOpen && cell.value === 'bomb') {
    className += ' ' + styles.cell__bomb;
  }
  if (cell.isOpen && cell.isErrorBomb) {
    className += ' ' + styles.cell__bomb_error;
  }
  if (!cell.isOpen && cell.isFlagged) {
    className += ' ' + styles.cell__flagged;
  }
  if (!cell.isOpen && cell.isErrorFlag) {
    className += ' ' + styles.cell__flagged_error;
  }

  return (
    <button
      className={className}
      style={style}
      onClick={(e) => {
        if (e.buttons === 0) {
          dispatchBoardAction(openCellAction(cell.row, cell.col));
        } else if (e.buttons === 2) {
          dispatchBoardAction(openCellsAroundAction(cell.row, cell.col));
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatchBoardAction(putFlagAction(cell.row, cell.col));
      }}
      onMouseDown={(e) => handleMouseDown(e, cell)}
    >
      {displayValue}
    </button>
  );
}

export default Cell;
