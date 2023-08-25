import Button from '../Button/Button';
import Display from '../Display/Display';
import styles from './styles.module.css';

function Header({ bombsCount, flagsCount, time, onNewGame, isDark }) {
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
      <Button title="Новая игра" onClick={onNewGame} isDark={isDark} />
      <Display content={timeInfo} />
    </header>
  );
}

export default Header;
