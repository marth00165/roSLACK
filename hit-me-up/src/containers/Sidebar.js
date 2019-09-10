import React from 'react';

import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import {allTeamsQuery} from '../graphql/team'
import InvitePeopleModal from '../components/InvitePeopleModal';


import AddChannelModal from '../components/AddChannelModal';

export default class Sidebar extends React.Component {
  state = {
     openAddChannelModal: false,
     openInvitePeopleModal: false,
   };

   toggleAddChannelModal = (e) => {
     if (e) {
       e.preventDefault();
     }
     this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }));
   };

   toggleInvitePeopleModal = (e) => {
     if (e) {
       e.preventDefault();
     }
     this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
   };

  render() {
     const { teams, team } = this.props;
     const { openInvitePeopleModal, openAddChannelModal } = this.state;

     let username = '';
     try {
       const token = localStorage.getItem('token');
       const { user } = decode(token);
       // eslint-disable-next-line prefer-destructuring
       username = user.username;
     } catch (err) {}

     return [
       <Teams key="team-sidebar" teams={teams} />,
       <Channels
         key="channels-sidebar"
         teamName={team.name}
         username={username}
         team_id={team.id}
         channels={team.channels}
         users={[{ id: 1, name: 'jawnBot' }, { id: 2, name: 'user1' }]}
         onAddChannelClick={this.toggleAddChannelModal}
         onInvitePeopleClick={this.toggleInvitePeopleModal}
       />,
       <AddChannelModal
         team_id={team.id}
         onClose={this.toggleAddChannelModal}
         open={openAddChannelModal}
         key="sidebar-add-channel-modal"
       />,
       <InvitePeopleModal
         team_id={team.id}
         onClose={this.toggleInvitePeopleModal}
         open={openInvitePeopleModal}
         key="invite-people-modal"
       />,
     ];
   }
 }
