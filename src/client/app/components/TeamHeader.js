import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export default function TeamHeader({ team }) {
  return (
    <Header>
      <h1>{team.name}</h1>
    </Header>
  );
}
