import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useTimer(key, defaultValue = 0) {
  const [time, setTime] = useLocalStorage(key, defaultValue);
  const [timeRunning, setTimeRunning] = useState(false);

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

  const startTimer = useCallback(() => {
    setTimeRunning(true);
  });

  const stopTimer = useCallback(() => {
    setTimeRunning(false);
  });

  const resetTimer = useCallback(() => {
    setTimeRunning(false);
    setTime(0);
  });

  return {
    time,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

export default useTimer;
