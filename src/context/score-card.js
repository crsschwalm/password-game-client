import React, { createContext } from 'react';
import useRosterData from '../hooks/useRosterData';

export const ScoreCard = createContext();

export const ScoreCardProvider = ({ children }) => {
  const {
    roster,
    handleRosterChange,
    rosterReady,
    incrementScore,
    myPlayer,
  } = useRosterData();

  return (
    <ScoreCard.Provider
      value={{
        roster,
        handleRosterChange,
        rosterReady,
        incrementScore,
        myPlayer,
      }}
    >
      {children}
    </ScoreCard.Provider>
  );
};
