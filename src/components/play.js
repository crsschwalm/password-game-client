import React, { useContext, useEffect, useState } from 'react';
import { ScoreCard } from '../context/score-card';
import { SocketContext } from '../context/socket';
import useCounters from '../hooks/useCounters';
import useRoomData from '../hooks/useRoomData';

function Play(props) {
  useRoomData();
  const socket = useContext(SocketContext);
  const { myPlayer, whosTurn } = useContext(ScoreCard);
  const {
    startCountDown,
    startCountUp,
    isCountingDown,
    count,
    resetTimer,
  } = useCounters({
    downFrom: 3,
    upTo: 120,
  });

  const [password, setPassword] = useState('');
  const [passwordReady, setPasswordReady] = useState(false);
  const [roundActive, setRoundActive] = useState(true);

  const myTurn = myPlayer.username === whosTurn.playerGivingHint?.name;

  const showPassword =
    passwordReady && myPlayer.playerIndex === whosTurn.playerIndex;

  const scorePoint = () => {
    socket.emit('fromClient.team.scored', myPlayer.teamIndex);
  };

  const skipTurn = () => {
    socket.emit('fromClient.next.turn');
  };

  const readyUp = () => {
    socket.emit('fromClient.start.round');
  };

  const getNewWord = () => {
    socket.emit('fromClient.shuffle.word');
  };

  useEffect(() => {
    if (roundActive) {
      setPasswordReady(false);
      resetTimer();
      getNewWord();

      startCountDown().then(() => {
        setPasswordReady(true);
        startCountUp();
      });
    }
  }, [roundActive]);

  useEffect(() => {
    const onStartRound = () => setRoundActive(true);
    const onEndRound = () => setRoundActive(false);

    socket.on('fromApi.send.word', setPassword);
    socket.on('fromApi.start.round', onStartRound);
    socket.on('fromApi.end.round', onEndRound);

    return () => {
      socket.off('fromApi.send.word', setPassword);
      socket.off('fromApi.start.round', onStartRound);
      socket.off('fromApi.end.round', onEndRound);
    };
  }, []);

  const countLabel = isCountingDown ? 'Get Ready!' : 'Start Thinking';

  if (!roundActive) {
    return (
      <div className="play-wrapper">
        <div className="result game__result">
          <h3>Timeout!</h3>
          <button className="play-again__button " onClick={readyUp}>
            Ready for the next Round?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="play-wrapper">
      {showPassword && (
        <div className="result__desktop game__result">
          <h3>{password}</h3>
          {myTurn && (
            <div className="your-turn-controls">
              <button className="play-again__button score" onClick={scorePoint}>
                Yes! We got it!
              </button>

              <button className="play-again__button skip" onClick={skipTurn}>
                Nope, skip to next player
              </button>
            </div>
          )}
        </div>
      )}
      <div className="pick">
        <div className="pick__title result__desktop">{countLabel}</div>
        <div className="pick__item">
          <span>{count}</span>
        </div>
        <div className="pick__title result__mobile">{countLabel}</div>
      </div>

      {showPassword && (
        <div className="result__mobile game__result">
          <h3>{password}</h3>
          {myTurn && (
            <div className="your-turn-controls">
              <button className="play-again__button score" onClick={scorePoint}>
                Yes! We got it!
              </button>

              <button className="play-again__button skip" onClick={skipTurn}>
                Nope, skip to next player
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Play;
