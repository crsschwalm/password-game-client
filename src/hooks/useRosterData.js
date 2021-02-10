import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';

const emptyRosterSpot = (index) => ({
  name: index === 0 ? 'Hint First' : 'Guess First',
  set: false,
});
const emptyTeam = (num) => ({
  name: `Team ${num}`,
  score: 0,
  players: [emptyRosterSpot(0), emptyRosterSpot(1)],
});

const useRosterData = () => {
  const socket = useContext(SocketContext);
  const [roster, setRoster] = useState([emptyTeam(1), emptyTeam(2)]);

  const [myPlayer, setMyPlayer] = useState({
    username: '',
    teamIndex: null,
    playerIndex: null,
  });

  const rosterReady = () =>
    roster
      .reduce(
        (acc, curr) => [...curr.players.map(({ set }) => set), ...acc],
        []
      )
      .every(Boolean);

  const incrementScore = (teamIndex) => {
    socket.emit('fromClient.increment.score', teamIndex);
  };

  const incrementRound = () => {
    socket.emit('fromClient.increment.round');
  };

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
    incrementScore,
    incrementRound,
    roster,
    myPlayer,
  };
};

export default useRosterData;
