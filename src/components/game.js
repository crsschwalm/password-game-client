import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import Footer from './footer';
import Groups from './groups';
import '../css/app.scss';

function Game() {
  return (
    <Router>
      <div className="wrapper">
        <Header scoreCard={{ 'alpha team': 5, betas: '9' }} />
        <Switch className="main">
          <Route path="/play">
            {/* <Play
              mine={myPick}
              house={housePick}
              score={gameScore}
              setScore={setGameScore}
              setHousePick={newHousePick}
            /> */}
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Game;
