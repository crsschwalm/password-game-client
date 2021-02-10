import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  const [shouldJoin, setShouldJoin] = useState(false);
  const [group, setGroup] = useState('');

  const handleNewGroupChange = ({ target: { value } }) => setGroup(value);

  return (
    <div className="home">
      <div className="start_controls">
        {!shouldJoin ? (
          <>
            <Link to="/groups">Start New Game</Link>
            <span className="link" onClick={() => setShouldJoin(true)}>
              Join Game
            </span>
          </>
        ) : (
          <>
            <input
              className="link"
              value={group}
              onChange={handleNewGroupChange}
              placeholder="GROUP CODE"
            ></input>

            <Link to="/groups">Go</Link>

            <span onClick={() => setShouldJoin(false)}>Back</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
