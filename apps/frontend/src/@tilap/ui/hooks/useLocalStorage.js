import { useState } from 'react';

const isLocalstorageAvailable = () => {
  if (typeof window === 'undefined') return false;

  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const localstorageIsAvailable = isLocalstorageAvailable();

const useLocalStorage = (key, initialValue = '', onError) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (!localstorageIsAvailable) {
        throw new Error('Localstorage is not available');
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      if (!localstorageIsAvailable) {
        throw new Error('Localstorage is not available');
      }
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
