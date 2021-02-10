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
    const newRoster = roster.map((team, i) => {
      if (teamIndex === i) {
        return { ...team, score: team.score + 1 };
      }
      return team;
    });

    socket.emit('fromClient.update.roster', newRoster);
  };

  const handleRosterChange = (teamIndex, playerIndex, username) => {
    setMyPlayer({ teamIndex, playerIndex, username });

    const newRoster = roster.map((team, tIndex) => ({
      ...team,
      players: team.players.map((player, pIndex) => {
        if (player.name === username) {
          return emptyRosterSpot(pIndex);
        }

        if (teamIndex === tIndex && playerIndex === pIndex && !player.set) {
          return { name: username, set: true };
        }

        return player;
      }),
    }));

    socket.emit('fromClient.update.roster', newRoster);
  };

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('fromApi.update.roster', setRoster);

    return () => socket.off('fromApi.update.roster', setRoster);
  }, [socket, setRoster]);

  return {
    rosterReady,
    handleRosterChange,
    incrementScore,
    roster,
    myPlayer,
  };
};

export default useRosterData;
