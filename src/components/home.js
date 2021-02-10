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
            <Link to={`/groups/${Math.random().toString(36).substring(7)}`}>
              Start New Game
            </Link>
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

            <Link to={`/groups/${group}`}>Go</Link>

            <span onClick={() => setShouldJoin(false)}>Back</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
