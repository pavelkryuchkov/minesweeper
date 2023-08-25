import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  createFieldArray,
  copyField,
  getNeighbors,
  addBombs,
  openFieldCell,
  openCells,
  checkGameStatus,
} from './helpers';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Board from './components/Board/Board';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

import styles from './App.module.css';

function App() {
  const [isDark, setIsDark] = useState(true);

  const WIDTH = 9;
  const HEIGHT = 9;
  const BOMBS_COUNT = 10;
  const [fieldWidth, setFieldWidth] = useState(WIDTH);
  const [fieldHeight, setFieldHeight] = useState(HEIGHT);
  const [bombsCount, setBombsCount] = useState(BOMBS_COUNT);
  const [field, setField] = useState(createFieldArray(fieldWidth, fieldHeight));

  useEffect(() => {
    setField(createFieldArray(fieldWidth, fieldHeight));
    startNewGame();
  }, [fieldWidth, fieldHeight]);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [flagsCount, setFlagsCount] = useState(0);
  const [time, setTime] = useState(0);
  const [timeRunning, setTimeRunning] = useState(false);

  useEffect(() => {
    if (isGameStarted && !isGameLost && !isGameWon) {
      setTimeRunning(true);
    } else if (isGameLost || isGameWon) {
      setTimeRunning(false);
    } else if (!isGameStarted) {
      setTime(0);
      setTimeRunning(false);
    }
  }, [isGameStarted, isGameLost, isGameWon]);

  useEffect(() => {
    let interval;
    if (timeRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!timeRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeRunning]);

  const [isMessageOpen, setIsMessageOpen] = useState(false);

  useEffect(() => {
    if (isGameLost || isGameWon) setIsMessageOpen(true);
  }, [isGameLost, isGameWon]);

  function startNewGame() {
    setIsGameStarted(false);
    setIsGameLost(false);
    setIsGameWon(false);
    setFlagsCount(0);
    setField(createFieldArray(fieldWidth, fieldHeight));
  }

  function handleClick(row, col) {
    const cell = field[row][col];
    if (cell.isFlagged || cell.isOpen || isGameLost || isGameWon) {
      return;
    }
    if (!isGameStarted) {
      let newField = addBombs(field, bombsCount, [row, col]);
      newField = openFieldCell(newField, row, col);
      setField(newField);
      setIsGameStarted(true);
    } else {
      const newField = openFieldCell(field, row, col);
      const status = checkGameStatus(newField);
      console.log(status);
      if (status === 'lost') {
        setIsGameLost(true);
      } else if (status === 'won') {
        setIsGameWon(true);
      }
      setField(newField);
    }
  }

  function handleDoubleClick(row, col) {
    const cell = field[row][col];
    if (!cell.isOpen || isGameLost || isGameWon) {
      return;
    }

    const neighbors = getNeighbors(cell, field);
    const flaggedCells = neighbors.filter((cell) => cell.isFlagged);
    if (flaggedCells.length !== cell.value) {
      return;
    }
    const cellsToOpen = neighbors.filter(
      (cell) => !cell.isFlagged && !cell.isOpen
    );
    // console.log(cellsToOpen);

    const newField = openCells(field, cellsToOpen);
    const status = checkGameStatus(newField);
    if (status === 'lost') {
      setIsGameLost(true);
    } else if (status === 'won') {
      setIsGameWon(true);
    }
    setField(newField);
  }

  function handleRightClick(row, col) {
    const cell = field[row][col];
    if (cell.isOpen || isGameLost || isGameWon) {
      return;
    }
    const newField = copyField(field);
    newField[row][col].isFlagged = !newField[row][col].isFlagged;
    if (newField[row][col].isFlagged) {
      setFlagsCount(flagsCount + 1);
    } else {
      setFlagsCount(flagsCount - 1);
    }
    setField(newField);
  }

  return (
    <div className={`${styles.app} ${isDark ? styles.app_dark : ''}`}>
      <div className={styles.game}>
        <Header
          bombsCount={bombsCount}
          flagsCount={flagsCount}
          time={time}
          onNewGame={startNewGame}
          isDark={isDark}
        />
        <Board
          field={field}
          handleClick={handleClick}
          handleDoubleClick={handleDoubleClick}
          handleRightClick={handleRightClick}
          isDark={isDark}
        />
        <Footer
          setFieldHeight={setFieldHeight}
          setFieldWidth={setFieldWidth}
          setBombsCount={setBombsCount}
          setIsDark={setIsDark}
          isDark={isDark}
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
                setIsMessageOpen(false);
                startNewGame();
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