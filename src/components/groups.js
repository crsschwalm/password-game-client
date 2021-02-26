import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ScoreCard } from '../context/score-card';
import useRoomData from '../hooks/useRoomData';
import useSocketListener from '../hooks/useSocketListener';

function Groups(props) {
  const { roomId } = useRoomData();
  const { roster, handleRosterChange, rosterReady, myPlayer } = useContext(
    ScoreCard
  );

  const history = useHistory();

  const [hasName, setHasName] = useState(false);
  const [username, setUsername] = useState('');

  const handleNameChange = ({ target: { value } }) => {
    setUsername(value);
  };

  const startGame = (room) => {
    history.push(`/play/${room}`);
  };

  const socket = useSocketListener({ startGame });

  const emitStartGame = () => {
    socket.emit('fromClient', { method: 'startGame', payload: roomId });
  };

  const submitName = () => {
    socket.emit('fromClient', { method: 'setMyPlayer', payload: { username } });
    setHasName(true);
  };

  useEffect(() => {
    if (myPlayer.username && !hasName) {
      setUsername(myPlayer.username);
      setHasName(true);
    }
  }, [myPlayer.username, hasName, setHasName, setUsername]);

  return (
    <div className="groups">
      {!hasName ? (
        <div className="groups_controls">
          <input
            className="link"
            value={username}
            onChange={handleNameChange}
            placeholder="Your name"
          ></input>

          <button
            disabled={!username.length}
            className="button"
            onClick={submitName}
          >
            Ready!
          </button>
        </div>
      ) : (
        <div className="groups_team_selection">
          <h1>Team Selection</h1>
          <div className="teams">
            {roster.map((team, teamIndex) => (
              <div className={`team team__${teamIndex + 1}`} key={teamIndex}>
                <h3>Team {teamIndex + 1}</h3>
                {team.players.map((player, playerIndex) => (
                  <div
                    key={playerIndex}
                    className={`player player__${playerIndex} ${
                      player.set ? 'active' : ''
                    }`}
                    onClick={() =>
                      handleRosterChange({ teamIndex, playerIndex, username })
                    }
                  >
                    {player.username}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* {rosterReady() && ( */}
          <div className="groups_controls">
            <button className="button" onClick={emitStartGame}>
              Start the game!
            </button>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}

export default Groups;
