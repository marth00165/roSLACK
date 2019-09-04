const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from "./models"
const types = fileLoader(path.join(__dirname, './schema'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const typeDefs = mergeTypes(types);



const resolvers = mergeResolvers(resolversArray);




const PORT = 8081;
const app = express();
app.use(cors('*'))





const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpoint = '/graphql';






const server = new ApolloServer({
  schema,
  context: {
    models,
    user: {
      id: 1,
    },


  }


 });
server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:8081${graphqlEndpoint}`)
  )
})
