import React from 'react';
import Channels from '../components/Channels'
import Teams from '../components/Teams'
import Header from '../components/Header'
import Messages from '../components/Messages'
import InputDiv from '../components/InputDiv'
import Sidebar from '../containers/Sidebar'
import AppLayout from '../components/AppLayout'





export default () => (
  <AppLayout>
  <Sidebar currentTeamId={1} />
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
