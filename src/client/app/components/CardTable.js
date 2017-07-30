import React from 'react';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import CardRow from './CardRow'

const StyledTable = styled("table")`
   width: 80%
   border-style: line
   border-width: 1px
`;

export const CardTable = ( { loading, cards, players, teams }) => {

    if ( loading )
    {
        return null;
    }

    const sorted_cards = cards.sort((a,b) => {
        if (a.score < b.score) {
            return 1;
        }
        else if (a.score > b.score) {
            return -1;
        }
        else
        {
            return 0;
        }
    });

    return (
        <StyledTable>
            <thead>
             <tr>
                <th>Player</th>
                <th>Team</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>CS</th>
                <th>GPM</th>
                <th>Towers Killed</th>
                <th>Roshan</th>
                <th>Teamfight</th>
                <th>Obs Wards</th>
                <th>Creeps Stacked</th>
                <th>Runes</th>
                <th>First Blood</th>
                <th>Stuns</th>
              </tr>
            </thead>
            <tbody>
            {sorted_cards.map(( card, i) => <CardRow
                key = {i}
                card = {card}
                player = {players[card.player.account_id]}
                team = {teams[card.player.team_id]}/>
            )}
            </tbody>
        </StyledTable>
    );
};
export default CardTable;

