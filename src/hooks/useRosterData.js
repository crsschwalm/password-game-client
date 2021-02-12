import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';

const useRosterData = () => {
  const socket = useContext(SocketContext);
  const [roster, setRoster] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});
  const [whosTurn, setWhosTurn] = useState({});

  const rosterReady = () =>
    roster
      .reduce(
        (acc, curr) => [...curr.players.map(({ set }) => set), ...acc],
        []
      )
      .every(Boolean);

  const handleRosterChange = (payload) => {
    socket.emit('fromClient.update.roster', payload);
  };

  useEffect(() => {
    socket.on('fromApi.update.roster', setRoster);
    socket.on('fromApi.whos.turn', setWhosTurn);
    socket.on('fromApi.update.user', setMyPlayer);

    return () => {
      socket.off('fromApi.update.roster', setRoster);
      socket.off('fromApi.whos.turn', setWhosTurn);
      socket.off('fromApi.update.user', setMyPlayer);
    };
  }, [socket, setRoster]);

  return {
    rosterReady,
    handleRosterChange,
    roster,
    myPlayer,
    whosTurn,
  };
};

export default useRosterData;
