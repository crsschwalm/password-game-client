import React from 'react';

function Scorebox(props) {
  return (
    <div className="scores">
      {Object.entries(props.scoreCard).map(([team, score]) => (
        <div className="scorebox">
          <div className="scorebox__title">{team}</div>
          <div className="scorebox__score">{score}</div>
        </div>
      ))}
    </div>
  );
}

export default Scorebox;
