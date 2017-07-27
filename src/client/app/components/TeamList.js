import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import PlayerList from './PlayerList';
import TeamHeader from './TeamHeader';

export const TeamList = ( { loading, players, players_data, team_data }) => {
  if (loading) {
    return (<div>Fetching players' data</div>); // TODO: make it prettier
  }

  const groupByTeam = Object.keys(players).reduce((acc, key) => {
    const player = players[key];
    acc[player.team_id] = acc[player.team_id] || [];
    acc[player.team_id].push(player);
    return acc;
  }, {});


  return (
    <Flex wrap>
    {
      Object.keys(groupByTeam)
        .sort((keyA, keyB) => {
          const teamA = team_data[keyA].tag.toLowerCase();
          const teamB = team_data[keyB].tag.toLowerCase();

          if (teamA < teamB) {
            return -1;
          }
          if (teamA > teamB) {
            return 1;
          }
          return 0;
        })
        .map(key => (
          <Box key={key} width={1} m={2}>
            <TeamHeader team={team_data[key]} />
            <PlayerList
              players={groupByTeam[key]}
              players_data={players_data}
              team={team_data[key]}
            />
          </Box>
        ))
    }
    </Flex>
  );
};
export default TeamList;