import React from 'react';
import Channels from '../components/Channels'
import Teams from '../components/Teams'
import Header from '../components/Header'
import Messages from '../components/Messages'
import InputDiv from '../components/InputDiv'
import AppLayout from '../components/AppLayout'





export default () => (
  <AppLayout>
  <Teams
  teams= {[{id:1, letter:"R"}, {id:2, letter:"O"}, {id:3, letter: "H"}, {id:4, letter: "I"}, {id:5, letter: "T"}]}
  />
  <Channels
    teamName="Team Name"
    username="username"
    channels={[{id: 1, name:"General"}, {id:2, name:"Random"}]}
    users={[{id:1, name:"jawnBot"}, {id:2, name:"boul"}]}
    />

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
