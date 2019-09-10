import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header'
import Messages from '../components/Messages'
import InputDiv from '../components/InputDiv'
import Sidebar from '../containers/Sidebar'
import AppLayout from '../components/AppLayout'
import {allTeamsQuery} from '../graphql/team'
import findIndex from 'lodash/findIndex';





const ViewTeam = ({ data: { loading, allTeams }, match: { params: { team_id, channel_id } } }) => {
 if (loading) {
   return null;
 }

 if (!allTeams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(team_id, 10);
   const teamIdx = teamIdInteger ? findIndex(allTeams, ['id', teamIdInteger]) : 0;
   const team = allTeams[teamIdx];

   const channelIdInteger = parseInt(channel_id, 10);
   const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
   const channel = team.channels[channelIdx];

   return (
      <AppLayout>
      <Sidebar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && (
       <Messages channel_id={channel.id}>
         <ul className="message-list">
           <li />
           <li />
         </ul>
       </Messages>
     )}
      {channel && <InputDiv channelName={channel.name} />}
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeam);
