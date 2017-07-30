import React from 'react';
import styled from 'styled-components';

const StyledRow = styled("tr")`
    border: 1px solid black;
    font-size: 12px;
`;

export const CardRow = ( { card, player, team }) => {
    return (
        <StyledRow>
            <td>{player.name}</td>
            <td>{team.name}</td>
            <td>{card.score.kills}</td>
            <td>{card.score.deaths}</td>
            <td>{card.score.creep_score}</td>
            <td>{card.score.gpm}</td>
            <td>{card.score.towers_killed}</td>
            <td>{card.score.roshans_killed}</td>
            <td>{card.score.teamfight_participation}</td>
            <td>{card.score.obs_placed}</td>
            <td>{card.score.creeps_stacked}</td>
            <td>{card.score.rune_pickups}</td>
            <td>{card.score.firstblood_claimed}</td>
            <td>{card.score.stuns}</td>
        </StyledRow>
    );
}

export default CardRow;