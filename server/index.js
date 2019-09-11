import express from 'express';
import { ApolloServer, gql} from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from "./models"
import jwt from "jsonwebtoken"
import {refreshTokens} from "./auth"
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

/*
ok first I get all my "types" or fetch requests basically and split them up into their own individual folders
so there isn't like a huge chunk queries and mutations (basically GET and POST) in one file and its all messy
so i use this fileLoader helper function which my friend Ben Ward (@benawad97) told me can merge all the files
together so got that from graphql documentation too.. anyway i join all of them and create resolvers which is the
second half to a type is a resolver any do the same and split those up this was just done for organisation purpose
this isn't how you have to do it
*/


const types = fileLoader(path.join(__dirname, './schema'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const SECRET = 'madaraUchihaWasInnocent';
const SECRET2 = 'El_curry'

const typeDefs = mergeTypes(types);




const resolvers = mergeResolvers(resolversArray);


// creating my express server here and giving it cors permissions

const PORT = 8081;
const graphqlEndpoint = '/graphql';
const subscriptionEndpoint = 'ws://localhost:8081/subscriptions'
const app = express();
app.use(cors('*'))

//jwt auth token

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
//adding the jwt auth to the server
app.use(addUser);




//creating my schema here with the typeDefs and resolvers from above

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});



// creating ApolloServer and passing schema and jwt token from headers
const server = new ApolloServer({
  schema,
  context:({req}) => {
  return {
      user: req.user,
     SECRET,
     SECRET2,
    models,
  }
}

});
server.applyMiddleware({ app });

//adding ther ApolloServer graphql to the express server


//creating back end websocket server from the express server
const wsServer = createServer(app)


/*
passing the models through sequelize then using the new
server with websockets to start subscriptions to send live messages
*/
models.sequelize.sync({}).then(() => {
  wsServer.listen(PORT, ()=>{
    new SubscriptionServer(
      {
          execute,
          subscribe,
          schema,
        //   onConnect: async ({ token, refreshToken }, webSocket) => {
        //     console.log(connectionParams)
        //     if (token && refreshToken) {
        //       console.log(token)
        //       let user = null;
        //       try {
        //         const payload = jwt.verify(token, SECRET);
        //         user = payload.user;
        //       } catch (err) {
        //         const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
        //         user = newTokens.user;
        //       }
        //       if (!user) {
        //         throw new Error('Invalid auth tokens');
        //       }
        //
        //       // const member = await models.Member.findOne({ where: { teamId: 1, userId: user.id } });
        //
        //       // if (!member) {
        //       //   throw new Error('Missing auth tokens!');
        //       // }
        //
        //       return true;
        //     }
        //
        //     throw new Error('Missing auth tokens!');
        //   },
        },
        {
          server: wsServer,
          path: '/subscriptions',
        },
      );
    });
     console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
  });
