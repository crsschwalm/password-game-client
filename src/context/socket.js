import React from 'react';
import socketio from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();
