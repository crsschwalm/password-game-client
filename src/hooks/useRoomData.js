import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/socket';

const useRoomData = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const [inRoom, setInRoom] = useState(false);

  const joinRoom = () => {
    console.log('Joining Room :>> ', id);
    socket.emit('fromClient.join.room', id);
  };

  useEffect(() => {
    socket.on('fromApi.in.room', setInRoom);

    return () => {
      socket.off('fromApi.in.room', setInRoom);
    };
  }, []);

  useEffect(() => {
    if (!inRoom && id) {
      joinRoom();
    }
  }, [id, inRoom]);

  return { id };
};

export default useRoomData;
