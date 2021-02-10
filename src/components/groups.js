import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const defaultHinter = { name: 'Hint First', set: false };
const defaultGuesser = { name: 'Guess First', set: false };

function Groups(props) {
  const [hasName, setHasName] = useState(false);
  const [userName, setUserName] = useState('');

  const roster = [
    [defaultHinter, defaultGuesser],
    [defaultHinter, defaultGuesser],
  ];

  const ready = Object.values(roster)
    .reduce((acc, curr) => [...Object.values(curr), ...acc], [])
    .every(({ set }) => Boolean(set));

  const handleNameChange = ({ target: { value } }) => setUserName(value);

  console.log('roster :>> ', roster);

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
            {roster.map((team, teamIndex) => {
              const teamNumber = teamIndex + 1;
              return (
                <div className={`team team__${teamNumber}`}>
                  <h3>Team {teamNumber}</h3>
                  {team.map((player, playerIndex) => {
                    const playerNumber = playerIndex + 1;
                    return (
                      <div
                        className={`player player__${playerNumber} ${
                          player.set ? 'active' : ''
                        }`}
                        onClick={() => {
                          roster[teamIndex][playerIndex] = {
                            name: userName,
                            set: true,
                          };
                        }}
                      >
                        {player.name}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {ready && (
            <Link
              disabled={!userName.length}
              className="link"
              onClick={() => setHasName(true)}
            >
              Ready!
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;
