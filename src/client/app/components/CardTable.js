import React from 'react';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import CardRow from './CardRow'

const StyledTable = styled("table")`
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
`;

export const CardTable = ( { loading, cards, players, teams }) => {

    if ( loading )
    {
        return null;
    }

    const sorted_cards = cards.sort((a,b) => b.total_score - a.total_score);

    return (
        <StyledTable>
            <thead>
             <tr>
                <th>Player</th>
                <th>Team</th>
                <th>Fantasy Role</th>
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
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
            {sorted_cards.map((card, i) => <CardRow
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

