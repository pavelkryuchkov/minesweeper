import { useCallback, useEffect, useReducer, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useTimer from './hooks/useTimer';
import {
  boardStateReducer,
  initializer,
  startNewGameAction,
} from './reducers/boardStateReducer';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Board from './components/Board/Board';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

import styles from './App.module.css';

function App() {
  const [isDark, setIsDark] = useLocalStorage('isDarkThemeOn', false);

  const [boardState, dispatchBoardAction] = useReducer(
    boardStateReducer,
    {},
    initializer
  );
  useEffect(() => {
    localStorage.setItem('boardState', JSON.stringify(boardState));
  }, [boardState]);
  const { field, level, flagsCount, isGameStarted, isGameLost, isGameWon } =
    boardState;

  const { time, startTimer, stopTimer, resetTimer } = useTimer('time');
  useEffect(() => {
    if (isGameStarted && !isGameLost && !isGameWon) {
      startTimer();
    } else if (isGameLost || isGameWon) {
      stopTimer();
    } else if (!isGameStarted) {
      resetTimer();
    }
  }, [isGameStarted, isGameLost, isGameWon]);

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  useEffect(() => {
    if (isGameLost || isGameWon) setIsMessageOpen(true);
  }, [isGameLost, isGameWon]);

  return (
    <div className={`${styles.app} ${isDark ? styles.app_dark : ''}`}>
      <div className={styles.game}>
        <Header
          dispatchBoardAction={dispatchBoardAction}
          flagsCount={flagsCount}
          isDark={isDark}
          level={level}
          time={time}
        />
        <Board
          dispatchBoardAction={dispatchBoardAction}
          field={field}
          isDark={isDark}
        />
        <Footer
          dispatchBoardAction={dispatchBoardAction}
          isDark={isDark}
          setIsDark={setIsDark}
        />
        {isMessageOpen && (
          <Modal onClose={() => setIsMessageOpen(false)} isDark={isDark}>
            {isGameLost && <p>Вы проиграли. Попробуйте ещё раз!</p>}
            {isGameWon && (
              <p>Вы выиграли! Вы нашли все мины за {time / 1000} сек.</p>
            )}
            <Button
              title="Сыграть ещё"
              onClick={() => {
                dispatchBoardAction(startNewGameAction());
                setIsMessageOpen(false);
              }}
              isDark={isDark}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
