import React from 'react';

import Header from '../components/Header'
import Messages from '../components/Messages'
import InputDiv from '../components/InputDiv'
import Sidebar from '../containers/Sidebar'
import AppLayout from '../components/AppLayout'





 const ViewTeam = ({match: {params}}) => (
  <AppLayout>
  <Sidebar currentTeamId={params.team_id} />
  <Header channelName= "General"/>
  <Messages>
    <ul>
      <li></li>
      <li></li>
    </ul>
  </Messages>
  <InputDiv channelName= "General"/>
</AppLayout>
)

export default ViewTeam
