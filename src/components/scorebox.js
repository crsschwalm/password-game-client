import React, { useContext } from 'react';
import { ScoreCard } from '../context/score-card';

function Scorebox(props) {
  const { roster, myPlayer, whosTurn } = useContext(ScoreCard);

  return (
    <div className="scores">
      {roster.map(({ name, score }, teamIndex) => (
        <div className="scorebox" key={teamIndex}>
          {teamIndex === myPlayer.teamIndex && (
            <span className="my-team">(me)</span>
          )}
          {teamIndex === whosTurn.teamIndex && (
            <span className="active-team">🟢</span>
          )}
          <div className="scorebox__title">{name}</div>
          <div className="scorebox__score">{score}</div>
        </div>
      ))}
    </div>
  );
}

export default Scorebox;
