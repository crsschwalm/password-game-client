import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';

const useRosterData = () => {
  const socket = useContext(SocketContext);
  const [roster, setRoster] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});

  const rosterReady = () =>
    roster
      .reduce(
        (acc, curr) => [...curr.players.map(({ set }) => set), ...acc],
        []
      )
      .every(Boolean);

  const handleRosterChange = (payload) => {
    setMyPlayer(payload);
    socket.emit('fromClient.update.roster', payload);
  };

  useEffect(() => {
    socket.on('fromApi.update.roster', setRoster);

    return () => {
      socket.off('fromApi.update.roster', setRoster);
    };
  }, [socket, setRoster]);

  return {
    rosterReady,
    handleRosterChange,
    roster,
    myPlayer,
  };
};

export default useRosterData;
