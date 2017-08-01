import React from 'react';
import styled from 'styled-components';

const StyledRow = styled("tr")`
    border: 1px solid black;
    font-size: 12px;
`;

const FANTASY_ROLES = [
    "Core", "Offlane", "Support"
]

export const CardRow = ( { card, player, team }) => {
    return (
        <StyledRow>
            <td>{player.name}</td>
            <td>{team.name}</td>
            <td>{FANTASY_ROLES[player.fantasy_role]}</td>
            <td>{card.score.kills.toFixed(2)}</td>
            <td>{card.score.deaths.toFixed(2)}</td>
            <td>{card.score.creep_score.toFixed(2)}</td>
            <td>{card.score.gpm.toFixed(2)}</td>
            <td>{card.score.towers_killed.toFixed(2)}</td>
            <td>{card.score.roshans_killed.toFixed(2)}</td>
            <td>{card.score.teamfight_participation.toFixed(2)}</td>
            <td>{card.score.obs_placed.toFixed(2)}</td>
            <td>{card.score.creeps_stacked.toFixed(2)}</td>
            <td>{card.score.rune_pickups.toFixed(2)}</td>
            <td>{card.score.firstblood_claimed.toFixed(2)}</td>
            <td>{card.score.stuns.toFixed(2)}</td>
            <td>{card.total_score.toFixed(2)}</td>
        </StyledRow>
    );
}

export default CardRow;