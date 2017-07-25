import React from 'react';

export const PlayerList = ( { players }) => (
    <div className="playerList">
        {Object.values(players).map(
        player_data => <p>{player_data.account_id}</p>,
      )}
    </div>
);

export default PlayerList;