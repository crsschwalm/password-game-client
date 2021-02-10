import React, { useEffect } from 'react';

import Game from './components/game';
import { SocketContext, socket } from './context/socket';

function App() {
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Game></Game>
    </SocketContext.Provider>
  );
}

export default App;
