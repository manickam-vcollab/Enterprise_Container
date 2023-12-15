import { useState, useEffect } from "react";

export const useLocalStorage = (key:string) => {
  const [value, setValue] = useState(() => {
    const saved : any = localStorage.getItem(key);
    try {
      return JSON.parse(saved);
    }
    catch(error){
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;