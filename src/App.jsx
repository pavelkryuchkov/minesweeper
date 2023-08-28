import { useEffect, useReducer, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useTimer from './hooks/useTimer';
import { boardStateReducer, initializer } from './reducers/boardStateReducer';
import { LEVELS, RESULTS_LENGTH } from './constants';

import Board from './components/Board/Board';
import Footer from './components/Footer/Footer';
import GameEndMessage from './components/GameEndMessage/GameEndMessage';
import GameSavedMessage from './components/GameSavedMessage/GameSavedMessage';
import Header from './components/Header/Header';

import styles from './App.module.css';

function App() {
  const [isDarkThemeOn, setIsDarkThemeOn] = useLocalStorage(
    'isDarkThemeOn',
    false
  );

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

  const [bestResults, setBestResults] = useLocalStorage('bestResults', {
    [LEVELS[0]]: [],
    [LEVELS[1]]: [],
    [LEVELS[2]]: [],
  });
  useEffect(() => {
    if (isGameWon) {
      const newResults = {
        ...bestResults,
        [level]: bestResults[level]
          .concat(time)
          .sort((a, b) => a - b)
          .slice(0, RESULTS_LENGTH),
      };
      setBestResults(newResults);
    }
  }, [isGameWon]);

  const [isSavedGameMessageOpen, setIsSavedGameMessageOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('load', () => {
      if (isGameStarted) {
        stopTimer();
        setIsSavedGameMessageOpen(true);
      }
    });
  });

  const [isGameEndMessageOpen, setIsGameEndMessageOpen] = useState(false);
  useEffect(() => {
    if (isGameLost || isGameWon) setIsGameEndMessageOpen(true);
  }, [isGameLost, isGameWon]);

  return (
    <div className={`${styles.app} ${isDarkThemeOn ? styles.app_dark : ''}`}>
      <div className={styles.game}>
        <Header
          dispatchBoardAction={dispatchBoardAction}
          flagsCount={flagsCount}
          isDark={isDarkThemeOn}
          level={level}
          time={time}
        />
        <Board
          dispatchBoardAction={dispatchBoardAction}
          field={field}
          isDark={isDarkThemeOn}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
        />
        <Footer
          bestResults={bestResults}
          dispatchBoardAction={dispatchBoardAction}
          isDark={isDarkThemeOn}
          setIsDark={setIsDarkThemeOn}
        />
        {isSavedGameMessageOpen && (
          <GameSavedMessage
            dispatchBoardAction={dispatchBoardAction}
            isDark={isDarkThemeOn}
            setIsMessageOpen={setIsSavedGameMessageOpen}
            startTimer={startTimer}
          />
        )}
        {isGameEndMessageOpen && (
          <GameEndMessage
            dispatchBoardAction={dispatchBoardAction}
            isDark={isDarkThemeOn}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            setIsMessageOpen={setIsGameEndMessageOpen}
            time={time}
          />
        )}
      </div>
    </div>
  );
}

export default App;
