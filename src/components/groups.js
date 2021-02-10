import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ScoreCard } from '../context/score-card';

function Groups(props) {
  const [userName, setUserName] = useState('');
  const [hasName, setHasName] = useState(false);

  const { roster, handleRosterChange, rosterReady } = useContext(ScoreCard);

  const handleNameChange = ({ target: { value } }) => setUserName(value);

  return (
    <div className="groups">
      {!hasName ? (
        <div className="groups_controls">
          <input
            className="link"
            value={userName}
            onChange={handleNameChange}
            placeholder="Your name"
          ></input>

          <button
            disabled={!userName.length}
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
                      handleRosterChange(teamIndex, playerIndex, userName)
                    }
                  >
                    {player.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {rosterReady() && (
            <Link to="/play" disabled={!userName.length} className="link">
              Ready!
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;
