import React from "react";
import styled from 'styled-components';


const TeamsWrapper = styled.div
` grid-column: 1;
  grid-row: 1 / 4;
  background-color: #124E78
  color: #FCAA67;
`;

const team = ({ id, letter }) => <li key={`team-${id}`}>{letter}</li>;


export default ({teams}) => (
  <TeamsWrapper>
    <ul>
      {teams.map(team)}
    </ul>
  </TeamsWrapper>
);
