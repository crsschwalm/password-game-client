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

  const myTurn = myPlayer.username === whosTurn.playerGivingHint?.username;

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

  return roundActive ? (
    <div className="play-wrapper">
      <TurnDisplay
        className="result__desktop"
        onSkip={skipTurn}
        onScore={scorePoint}
        show={showPassword}
        isMyTurn={myTurn}
        password={password}
      />

      <div className="pick">
        <div className="pick__title result__desktop">{countLabel}</div>
        <div className="pick__item">
          <span>{count}</span>
        </div>
        <div className="pick__title result__mobile">{countLabel}</div>
      </div>

      <TurnDisplay
        className="result__mobile"
        onSkip={skipTurn}
        onScore={scorePoint}
        show={showPassword}
        isMyTurn={myTurn}
        password={password}
      />
    </div>
  ) : (
    <RoundBreak onReady={readyUp}></RoundBreak>
  );
}

const RoundBreak = ({ onReady }) => (
  <div className="play-wrapper">
    <div className="result game__result">
      <h3>Timeout!</h3>
      <button className="play-again__button " onClick={onReady}>
        Ready for the next Round?
      </button>
    </div>
  </div>
);

const TurnDisplay = ({
  className,
  onSkip,
  onScore,
  isMyTurn,
  show,
  password,
}) =>
  show ? (
    <div className={`${className} game__result`}>
      <h3>{password}</h3>
      {isMyTurn && (
        <div className="your-turn-controls">
          <button className="play-again__button score" onClick={onScore}>
            Yes! We got it!
          </button>

          <button className="play-again__button skip" onClick={onSkip}>
            Nope, skip to next player
          </button>
        </div>
      )}
    </div>
  ) : null;

export default Play;
