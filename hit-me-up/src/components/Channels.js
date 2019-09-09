import React from 'react';
import styled from 'styled-components';

const ChannelWrapper = styled.div
` grid-column: 2;
  grid-row: 1/4;
  background-color: #313638
  color: #EEF0F2;
`;

const channel = ({id, name}) => (
  <li key={`channel-${id}`}># {name}</li>
);
const user = ({id, name}) => (
  <li key={`user-${id}`}>{name}</li>
);


export default({teamName, username, channels, users}) => (
  <ChannelWrapper>
    <div>
      {teamName}
      {username}
    </div>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(channel)}
      </ul>
    </div>

    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user)}
      </ul>
    </div>
  </ChannelWrapper>
);
