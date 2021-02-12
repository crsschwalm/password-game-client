import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/socket';

const generateUserId = () => Math.random().toString(24);

const userIdProperty = 'password-game-user-id';

const useRoomData = () => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);

  const [inRoom, setInRoom] = useState(false);

  let userId = localStorage.getItem(userIdProperty);

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(userIdProperty, userId);
  }

  const joinRoom = () => {
    socket.emit('fromClient.join.room', { roomId, userId });
  };

  useEffect(() => {
    socket.on('fromApi.in.room', setInRoom);

    return () => {
      socket.off('fromApi.in.room', setInRoom);
    };
  }, []);

  useEffect(() => {
    if (!inRoom && roomId) {
      joinRoom();
    }
  }, [roomId, inRoom]);

  return { roomId };
};

export default useRoomData;
