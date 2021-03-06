import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #124E78
  color: #FCAA67;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #FCAA67;
  }
`;

const NewTeam = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #FCAA67;
}
`;


const team = ({ id, letter }) => <Link key={id} to={`/view-team/${id}`}><TeamListItem  key={`team-${id}`}>{letter}</TeamListItem></Link>;


export default ({teams}) => (
  <TeamsWrapper>
    <TeamList style={{paddingTop:"20px"}} >
      {teams.map(team)}
    </TeamList>
  </TeamsWrapper>
);
