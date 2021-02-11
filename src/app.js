import React from 'react';

import Game from './components/game';
import { ScoreCardProvider } from './context/score-card';
import { SocketProvider } from './context/socket';

function App() {
  return (
    <SocketProvider>
      <ScoreCardProvider>
        <Game></Game>
      </ScoreCardProvider>
    </SocketProvider>
  );
}

export default App;
