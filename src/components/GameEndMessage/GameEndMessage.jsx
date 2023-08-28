import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { startNewGameAction } from '../../reducers/boardStateReducer';

// import styles from './styles.module.css';

function GameEndMessage({
  dispatchBoardAction,
  isDark,
  isGameLost,
  isGameWon,
  setIsMessageOpen,
  time,
}) {
  return (
    <Modal onClose={() => setIsMessageOpen(false)} isDark={isDark}>
      {isGameLost && <p>Вы проиграли. Попробуйте ещё раз!</p>}
      {isGameWon && <p>Вы выиграли! Вы нашли все мины за {time / 1000} сек.</p>}
      <Button
        title="Сыграть ещё"
        onClick={() => {
          dispatchBoardAction(startNewGameAction());
          setIsMessageOpen(false);
        }}
        isDark={isDark}
      />
    </Modal>
  );
}

export default GameEndMessage;
