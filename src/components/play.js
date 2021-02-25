import React, { useContext, useEffect, useState } from 'react';
import { ScoreCard } from '../context/score-card';
import { SocketContext } from '../context/socket';
import useRoomData from '../hooks/useRoomData';

function Play(props) {
  useRoomData();
  const socket = useContext(SocketContext);
  const { myPlayer, whosTurn } = useContext(ScoreCard);

  const [password, setPassword] = useState('');
  const [roundActive, setRoundActive] = useState(true);
  const [count, setCount] = useState('');

  const myTurn = myPlayer.username === whosTurn.playerGivingHint?.username;

  const showPassword = myPlayer.playerIndex === whosTurn.playerIndex;

  const scorePoint = () => {
    socket.emit('fromClient.team.scored', myPlayer.teamIndex);
  };

  const skipTurn = () => {
    socket.emit('fromClient.next.turn');
  };

  const startRound = () => {
    socket.emit('fromClient.start.round');
  };

  const endRound = () => {
    socket.emit('fromClient.end.round');
  };

  const getNewWord = () => {
    socket.emit('fromClient.shuffle.word');
  };

  useEffect(() => {
    console.log('roundActive :>> ', roundActive);
  }, [roundActive]);

  useEffect(() => {
    const onStartRound = () => setRoundActive(true);
    const onEndRound = () => setRoundActive(false);

    socket.on('fromApi.send.word', setPassword);
    socket.on('fromApi.start.round', onStartRound);
    socket.on('fromApi.end.round', onEndRound);
    socket.on('fromApi.timer', setCount);

    return () => {
      socket.off('fromApi.send.word', setPassword);
      socket.off('fromApi.start.round', onStartRound);
      socket.off('fromApi.end.round', onEndRound);
      socket.off('fromApi.timer', setCount);
    };
  }, []);

  const countLabel = 'Start Thinking';

  return roundActive ? (
    <div className="play-wrapper">
      <TurnDisplay
        className="result__desktop"
        onSkip={skipTurn}
        onScore={scorePoint}
        onShuffle={getNewWord}
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
        onShuffle={getNewWord}
        show={showPassword}
        isMyTurn={myTurn}
        password={password}
      />
    </div>
  ) : (
    <RoundBreak onReady={startRound}></RoundBreak>
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
  onShuffle,
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

          <button className="play-again__button shuffle" onClick={onShuffle}>
            Shuffle 🔀
          </button>
        </div>
      )}
    </div>
  ) : null;

export default Play;
