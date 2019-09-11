import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const ChannelWrapper = styled.div`
 grid-column: 2;
  grid-row: 1/4;
  background-color: #313638
  color: #EEF0F2;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #073A3C;
  }
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #27A8DB;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, team_id) => (
  <Link key={`channel-${id}`} to={`/view-team/${team_id}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);



export default class Channels extends React.Component
{

  state = {
    searchChannels: this.props.channels
  }



  updateSearch = (ev) => {
    let search = ev.target.value

    let newChannels = this.props.channels.filter(
      (channel) => {
        return channel.name.indexOf(search) != -1;
      }
    )

    this.setState({
      searchChannels: newChannels
    })
}

onBlur = () =>{
  this.setState({
    searchChannels: this.props.channels
  })
}






render(){

  const { teamName, username, channels, users, onAddChannelClick, team_id, onInvitePeopleClick, isOwner } = this.props
  const {searchChannels} = this.state
  return (
    <ChannelWrapper>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {username}
        <br/>
        <Input onBlur={this.onBlur} onChange ={this.updateSearch} icon='users' iconPosition='left' placeholder='Jump To...' />
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}
          </SideBarListHeader>
          {searchChannels.map(c => channel(c, team_id))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(user)}
        </SideBarList>
      </div>
      {isOwner &&
        (<div>
          <a href="#invite-people" onClick={onInvitePeopleClick}>
            + Invite People
          </a>
      </div>) }  </ChannelWrapper>
    )
  }
}
