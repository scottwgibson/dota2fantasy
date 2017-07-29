import React from 'react';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

export const CardList = ( { loading, cards, players_data }) => {

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
        <Flex>
            <ol>
            {sorted_cards.map(card =>
                <li>{card.account_id} : {card.score}</li>
            )}
            </ol>
        </Flex>
    );
};
export default CardList;