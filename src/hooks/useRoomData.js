import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocketListener from './useSocketListener';

const generateUserId = () => Math.random().toString(24);

const userIdProperty = 'password-game-user-id';

const useRoomData = () => {
  const { roomId } = useParams();
  const [inRoom, setInRoom] = useState(false);

  let userId = localStorage.getItem(userIdProperty);

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(userIdProperty, userId);
  }

  const socket = useSocketListener({ setInRoom });

  useEffect(() => {
    const joinRoom = () =>
      socket.emit('fromClient', {
        method: 'joinRoom',
        payload: { roomId, userId },
      });

    if (!inRoom && roomId) {
      joinRoom();
    }
  }, [socket, userId, roomId, inRoom]);

  return { roomId };
};

export default useRoomData;
