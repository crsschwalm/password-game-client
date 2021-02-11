import React, { useContext } from 'react';
import { ScoreCard } from '../context/score-card';
import Scorebox from './scorebox';

function Header(props) {
  const { whosTurn } = useContext(ScoreCard);

  const turnsSet =
    whosTurn?.playerGivingHint?.name && whosTurn?.playerGuessing?.name;

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
            {whosTurn?.playerGivingHint?.name} <span>🤔👉🤷‍♂️</span>{' '}
            {whosTurn?.playerGuessing?.name}
          </h3>
        </div>
      )}
    </header>
  );
}

export default Header;
