const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';
import models from "./models"



const PORT = 8081;
const app = express();

const typeDefs = gql`

  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpoint = '/graphql';






const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
  )
})
