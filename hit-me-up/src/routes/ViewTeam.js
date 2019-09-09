import React from 'react';
import Channels from '../components/Channels'
import Teams from '../components/Teams'
import Header from '../components/Header'
import Messages from '../components/Messages'
import InputDiv from '../components/InputDiv'
import AppLayout from '../components/AppLayout'
import {Input} from 'semantic-ui-react';




export default () => (
  <AppLayout>
  <Teams>Teams</Teams>
  <Channels>Channels</Channels>
  <Header>Header</Header>
  <Messages>
    <ul>
      <li></li>
      <li></li>
    </ul>
  </Messages>
  <InputDiv>
    <Input name="message"  placeholder="Enter Message Here.." fluid />
  </InputDiv>
</AppLayout>
)
