import React, { useEffect } from 'react';
import socketio from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_SERVER_URL;

export const SocketContext = React.createContext();
const socket = socketio.connect(ENDPOINT);

export const SocketProvider = ({ children }) => {
  useEffect(() => socket.disconnect, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
