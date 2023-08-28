import Button from '../Button/Button';
import Display from '../Display/Display';
import {
  BOARD_PARAMS,
  startNewGameAction,
} from '../../reducers/boardStateReducer';
import styles from './styles.module.css';

function Header({ dispatchBoardAction, flagsCount, isDark, level, time }) {
  const bombsCount = BOARD_PARAMS[level].bombsCount;
  const flagsInfo =
    bombsCount >= flagsCount
      ? (bombsCount - flagsCount).toString().padStart(3, '0')
      : '-' + (flagsCount - bombsCount).toString().padStart(2, '0');

  const timeInfo = Math.min(Math.floor(time / 1000), 999)
    .toString()
    .padStart(3, '0');

  return (
    <header className={`${styles.header} ${isDark ? styles.header_dark : ''}`}>
      <Display content={flagsInfo} />
      <Button
        title="Новая игра"
        onClick={() => dispatchBoardAction(startNewGameAction())}
        isDark={isDark}
      />
      <Display content={timeInfo} />
    </header>
  );
}

export default Header;
