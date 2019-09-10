import React from 'react';
import { graphql } from 'react-apollo';
import {gql} from 'apollo-boost';

import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) =>
  (loading ? null : <Messages>{JSON.stringify(messages)}</Messages>);

const messagesQuery = gql`
  query($channel_id: Int!) {
    messages(channel_id: $channel_id) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channel_id: props.channel_id,
  }),
})(MessageContainer);
