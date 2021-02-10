import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket';
import useRoomData from '../hooks/useRoomData';

const wait = (ms = 0) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

function Play(props) {
  useRoomData();

  const socket = useContext(SocketContext);
  const [countDown, setCountDown] = useState(3);
  const [countUp, setCountUp] = useState(0);
  const [countDirection, setCountDirection] = useState('down');
  const [password, setPassword] = useState('The Password is...');

  const startCountDown = async (from = countDown, to = 0) => {
    while (from > to) {
      await wait(1000);
      const newCount = from - 1;
      setCountDown(newCount);
      return startCountDown(newCount);
    }
    return;
  };

  const startCountUp = async (from = countUp, to = 120) => {
    while (from < to) {
      await wait(1000);
      const newCount = from + 1;
      setCountUp(newCount);
      return startCountUp(newCount);
    }
    return;
  };

  useEffect(() => {
    socket.on('fromApi.send.word', setPassword);

    setCountDirection('down');
    startCountDown().then(() => {
      setCountDirection('up');
      startCountUp();
    });

    return () => {
      socket.off('fromApi.send.word', setPassword);
    };
  }, []);

  const countLabel = countDirection === 'up' ? 'Start Thinking' : 'Get Ready!';
  const count = countDirection === 'up' ? countUp : countDown;

  return (
    <div className="play-wrapper">
      <div className="result__desktop game__result">
        <h3>{password}</h3>
        <Link
          className="play-again__button "
          to="/"
          // onClick={() => props.setHousePick()}
        >
          Yes! We got it!
        </Link>

        <Link
          className="play-again__button "
          to="/"
          // onClick={() => props.setHousePick()}
        >
          Nope, skip to next player
        </Link>
      </div>

      <div className="pick">
        <div className="pick__title result__desktop">{countLabel}</div>
        <div className="pick__item">
          <span>{count}</span>
        </div>
        <div className="pick__title result__mobile">{countLabel}</div>
      </div>

      <div className="result__mobile game__result">
        <h3>{password}</h3>
        <Link
          className="play-again__button "
          to="/"
          // onClick={() => props.setHousePick()}
        >
          Yes! We got it!
        </Link>

        <Link
          className="play-again__button "
          to="/"
          // onClick={() => props.setHousePick()}
        >
          Nope, skip to next player
        </Link>
      </div>
    </div>
  );
}

export default Play;
