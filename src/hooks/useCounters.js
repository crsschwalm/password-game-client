import { useRef, useState } from 'react';

const wait = (ms = 0) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

const useCounters = ({ downFrom = 3, downTo = 0, upFrom = 0, upTo = 60 }) => {
  const [count, setCount] = useState(downFrom);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [myInterval, setMyInterval] = useState();

  const startCountDown = async (from = downFrom) => {
    if (from === downFrom) {
      setIsCountingDown(true);
      setCount(downFrom);
    }

    while (from > downTo) {
      await wait(1000);
      const newCount = from - 1;
      setCount(newCount);
      return startCountDown(newCount);
    }

    return setIsCountingDown(false);
  };

  const startCountUp = () => {
    setIsCountingUp(true);

    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    setMyInterval(interval);
  };

  const resetTimer = () => {
    setCount(0);
    setIsCountingUp(false);
    setIsCountingDown(false);
    clearInterval(myInterval);
  };

  return {
    startCountUp,
    isCountingUp,
    startCountDown,
    isCountingDown,
    count,
    resetTimer,
  };
};

export default useCounters;
