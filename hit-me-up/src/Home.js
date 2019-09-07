import React from 'react';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';


 const Home = ({data: {allUsers = []}}) => {
   console.log(allUsers)
   return (allUsers.map(user =>  <h1 key={user.id}>{user.email}</h1>));
}

const allUsersQuery = gql `
   {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);
