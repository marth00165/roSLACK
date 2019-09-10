import React from 'react';
import { graphql } from 'react-apollo';
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

 const teamIdx = team_id ? findIndex(allTeams, ['id', parseInt(team_id, 10)]) : 0;
  const team = allTeams[teamIdx];
  const channelIdx = channel_id ? findIndex(team.channels, ['id', parseInt(channel_id, 10)]) : 0;
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
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <InputDiv channelName={channel.name}/>
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeam);
