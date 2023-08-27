import { useEffect, useState } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

export default useLocalStorage;
