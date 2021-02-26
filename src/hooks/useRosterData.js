import { useState } from 'react';
import useSocketListener from './useSocketListener';

const useRosterData = () => {
  const [roster, setRoster] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});
  const [whosTurn, setWhosTurn] = useState({});

  const socket = useSocketListener({
    setRoster,
    setWhosTurn,
    setMyPlayer,
  });

  const rosterReady = () =>
    roster
      .reduce(
        (acc, curr) => [...curr.players.map(({ set }) => set), ...acc],
        []
      )
      .every(Boolean);

  const handleRosterChange = (payload) => {
    socket.emit('fromClient', { method: 'updateRoster', payload });
  };

  return {
    rosterReady,
    handleRosterChange,
    roster,
    myPlayer,
    whosTurn,
  };
};

export default useRosterData;
