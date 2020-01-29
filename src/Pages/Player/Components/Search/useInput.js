import { useState } from 'react';

const useModal = () => {
  const [inputValue, setInput] = useState('');

  function inputHandler(e) {
    setInput(e.target.value);
  }

  return {
    inputValue,
    inputHandler,
  };
};

export default useModal;
