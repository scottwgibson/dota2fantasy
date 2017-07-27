import React from 'react';
import PlayerCard from './PlayerCard';
import { Flex, Box } from 'grid-styled';

export const PlayerList = ( { loading, players, players_data, team }) => (
  <Flex>
  {
    players.map((player, i) => (
      <Box width={1/5} m={2} key={i}>
        <PlayerCard
          data={player}
          team={team}
          account={players_data[player.account_id]}
        />
      </Box>
    ))
  }
  </Flex>
);

export default PlayerList;