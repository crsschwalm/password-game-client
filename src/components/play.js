import React, { useContext, useEffect, useState } from 'react';
import { ScoreCard } from '../context/score-card';
import useRoomData from '../hooks/useRoomData';
import useSocketListener from '../hooks/useSocketListener';

function Play(props) {
  useRoomData();
  const { myPlayer, whosTurn } = useContext(ScoreCard);

  const [password, setPassword] = useState('');
  const [roundActive, setRoundActive] = useState(true);
  const [time, setTime] = useState('');

  const myTurn = myPlayer.username === whosTurn.playerGivingHint?.username;

  const showPassword = myPlayer.playerIndex === whosTurn.playerIndex;

  const socket = useSocketListener({
    setPassword,
    setTime,
    startRound: () => setRoundActive(true),
    endRound: () => setRoundActive(false),
  });

  const scorePoint = () =>
    socket.emit('fromClient', {
      method: 'teamScored',
      payload: myPlayer.teamIndex,
    });

  const emitNextTurn = () =>
    socket.emit('fromClient', { method: 'startNextTurn' });

  const emitStartRound = () =>
    socket.emit('fromClient', { method: 'startRound' });

  const emitEndRound = () => socket.emit('fromClient', { method: 'endRound' });

  const emitGetNewWord = () =>
    socket.emit('fromClient', { method: 'shuffleWord' });

  useEffect(() => {
    console.log('roundActive :>> ', roundActive);
  }, [roundActive]);

  const timeLabel = !!password ? 'Get Ready' : 'Start Thinking';

  const renderTurnDisplay = (className) => (
    <TurnDisplay
      className={className}
      onSkip={emitNextTurn}
      onScore={scorePoint}
      onShuffle={emitGetNewWord}
      show={showPassword}
      isMyTurn={myTurn}
      password={password}
    />
  );

  return roundActive ? (
    <div className="play-wrapper">
      {renderTurnDisplay('result__desktop')}

      <div className="pick">
        <div className="pick__title result__desktop">{timeLabel}</div>
        <div className="pick__item">
          <span>{time}</span>
        </div>
        <div className="pick__title result__mobile">{timeLabel}</div>
      </div>

      {renderTurnDisplay('result__mobile')}
    </div>
  ) : (
    <RoundBreak onReady={emitStartRound}></RoundBreak>
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
            We guessed it ✅
          </button>

          <button className="play-again__button skip" onClick={onSkip}>
            Next Player 👉
          </button>

          <button className="play-again__button shuffle" onClick={onShuffle}>
            Shuffle Word 🔀
          </button>
        </div>
      )}
    </div>
  ) : null;

export default Play;
