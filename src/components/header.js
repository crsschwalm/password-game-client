import React, { useContext } from 'react';
import { ScoreCard } from '../context/score-card';
import Scorebox from './scorebox';

function Header(props) {
  const { whosTurn } = useContext(ScoreCard);

  const turnsSet =
    whosTurn?.playerGivingHint?.username && whosTurn?.playerGuessing?.username;

  return (
    <header>
      <h1 className="header__title">
        <span>The</span>
        <span>Password</span>
        <span>Is...</span>
      </h1>
      <Scorebox scoreCard={props.scoreCard} />
      {turnsSet && (
        <div className="whos-turn">
          <h3>
            {whosTurn?.playerGivingHint?.username} <span>🤔👉🤷‍♂️</span>{' '}
            {whosTurn?.playerGuessing?.username}
          </h3>
        </div>
      )}
    </header>
  );
}

export default Header;
