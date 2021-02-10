import React, { useEffect } from 'react';
import socketio from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

export const SocketContext = React.createContext();
const socket = socketio.connect(ENDPOINT);

export const SocketProvider = ({ children }) => {
  useEffect(() => socket.disconnect, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
