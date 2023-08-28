import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { startNewGameAction } from '../../reducers/boardStateReducer';

import styles from './styles.module.css';

function GameSavedMessage({
  dispatchBoardAction,
  isDark,
  setIsMessageOpen,
  startTimer,
}) {
  return (
    <Modal isDark={isDark}>
      <p>Продолжить сохранённую игру или начать новую?</p>
      <div className={styles.buttons}>
        <Button
          title="Продолжить"
          onClick={() => {
            startTimer();
            setIsMessageOpen(false);
          }}
          isDark={isDark}
        />
        <Button
          title="Начать новую"
          onClick={() => {
            dispatchBoardAction(startNewGameAction());
            setIsMessageOpen(false);
          }}
          isDark={isDark}
        />
      </div>
    </Modal>
  );
}

export default GameSavedMessage;
