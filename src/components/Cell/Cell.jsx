import styles from './styles.module.css';

const COLORS = {
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'darkblue',
  5: 'brown',
  6: 'orange',
  7: 'pink',
  8: 'darkviolet',
};

function Cell({
  value,
  isOpen,
  isFlagged,
  row,
  col,
  handleClick,
  handleDoubleClick,
  handleRightClick,
  size,
  isDark,
}) {
  let style = {
    width: size,
    height: size,
  };
  let displayValue = '';
  if (isOpen && value !== 0 && value !== 'bomb') {
    style.color = COLORS[value];
    displayValue = value;
  }
  let className = styles.cell;
  if (isDark) {
    className += ' ' + styles.cell_dark;
  }
  if (isOpen) {
    className += ' ' + styles.cell__open;
  }
  if (isOpen && isDark) {
    className += ' ' + styles.cell__open_dark;
  }
  if (isOpen && value === 'bomb') {
    className += ' ' + styles.cell__bomb;
  }
  if (!isOpen && isFlagged) {
    className += ' ' + styles.cell__flagged;
  }
  return (
    <button
      className={className}
      style={style}
      onClick={(e) => {
        if (e.buttons === 0) {
          handleClick(row, col);
        } else if (e.buttons === 2) {
          handleDoubleClick(row, col);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRightClick(row, col);
      }}
    >
      {displayValue}
    </button>
  );
}

export default Cell;
