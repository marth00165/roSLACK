import React from 'react';
import { graphql } from 'react-apollo';
import Header from '../components/Header'
import InputDiv from '../components/InputDiv'
import Sidebar from '../containers/Sidebar'
import MessageContainer from '../containers/MessageContainer';
import AppLayout from '../components/AppLayout'
import {allTeamsQuery} from '../graphql/team'
import findIndex from 'lodash/findIndex';





const ViewTeam = ({ data: { loading, allTeams, inviteTeams }, match: { params: { team_id, channel_id } } }) => {
 if (loading) {
   return null;
 }

 const teams = [...allTeams, ...inviteTeams];




  const teamIdInteger = parseInt(team_id, 10);
   const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
   const team = teamIdx === -1 ? teams[0] : teams[teamIdx];



   const channelIdInteger = parseInt(channel_id, 10);
   const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
   const channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

   return (
      <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channel_id={channel.id} />}
      {channel && <InputDiv channelName={channel.name} channel_id={channel.id} />}
    </AppLayout>
  )
}

export default graphql(allTeamsQuery,{
  options:{
    fetchPolicy: 'network-only'
  }
})(ViewTeam);
