import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ScoreCard } from '../context/score-card';
import { SocketContext } from '../context/socket';
import useRoomData from '../hooks/useRoomData';

function Groups(props) {
  const { id } = useRoomData();
  const socket = useContext(SocketContext);
  const { roster, handleRosterChange, rosterReady } = useContext(ScoreCard);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [hasName, setHasName] = useState(false);

  const handleNameChange = ({ target: { value } }) => setUsername(value);

  const startGame = () => {
    socket.emit('fromClient.start.game', id);
  };

  const sendToGame = (room) => {
    history.push(`/play/${room}`);
  };

  useEffect(() => {
    socket.on('fromApi.start.game', sendToGame);
    return () => {
      socket.off('fromApi.start.game', sendToGame);
    };
  }, []);

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
            onClick={() => setHasName(true)}
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
                    {player.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* {rosterReady() && ( */}
          <div className="groups_controls">
            <button className="button" onClick={startGame}>
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
