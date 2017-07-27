import React from 'react'
import styled from 'styled-components';

const Header = styled.div`
  font-size: 20px;
  text-align: center;
`;

export default function HeaderComponent() {
  return (
    <Header>
      <h1>Dota 2 Fantasy Helper</h1>
    </Header>
  );
}