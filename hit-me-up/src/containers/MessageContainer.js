import React from 'react';
import { graphql } from 'react-apollo';
import {gql} from 'apollo-boost';
import { Comment } from 'semantic-ui-react';

import Messages from '../components/Messages';

const newChannelMessageSubscription = gql`
  subscription($channel_id: Int!) {
    newChannelMessage(channel_id: $channel_id) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

class MessageContainer extends React.Component {
  componentDidMount() {
     this.unsubscribe = this.subscribe(this.props.channel_id);
  }

  componentWillReceiveProps({ channel_id }) {
    if (this.props.channel_id !== channel_id) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
       this.unsubscribe = this.subscribe(channel_id);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channel_id =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channel_id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });


  render() {
    const { data: { loading, messages } } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {messages.map(m => (
            <Comment key={`${m.id}-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{Date(m.created_at)}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

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
  options:{
    fetchPolicy: 'network-only'
  }
})(MessageContainer);
