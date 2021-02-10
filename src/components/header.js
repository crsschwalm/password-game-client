import React from 'react';
import Scorebox from './scorebox';

function Header(props) {
  return (
    <header>
      <h1 className="header__title">
        <span>The</span>
        <span>Password</span>
        <span>Is...</span>
      </h1>
      <Scorebox scoreCard={props.scoreCard} />
    </header>
  );
}

export default Header;
