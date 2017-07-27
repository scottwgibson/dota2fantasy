import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';


const Card = styled(Box)`
  background: white;
  box-shadow: rgba(0, 0, 0, 0.17) 0px 2px 2px 0px;
  border: 1px solid rgb(229, 229, 229);
  padding: 20px;
`;


export default function PlayerCard({ data, team, account }) {
  return (
    <Flex column>
      <Card>
        [{team.tag}]{account.name}
      </Card>
    </Flex>
  )
}
