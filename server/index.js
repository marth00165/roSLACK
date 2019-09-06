const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from "./models"
import jwt from "jsonwebtoken"
import {refreshTokens} from "./auth"

const types = fileLoader(path.join(__dirname, './schema'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const SECRET = 'madaraUchihaWasInnocent';
const SECRET2 = 'El_curry'

const typeDefs = mergeTypes(types);



const resolvers = mergeResolvers(resolversArray);




const PORT = 8081;
const app = express();
app.use(cors('*'))

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);





const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpoint = '/graphql';

const server = new ApolloServer({
  schema,
  context:{
    models,
    user: {
      id: 1
    },
    SECRET,
    SECRET2
  }
});
server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:8081${graphqlEndpoint}`)
  )
})
