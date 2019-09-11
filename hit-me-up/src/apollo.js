import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink} from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import createFileLink from './createFileLink';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// http link
const httpLink = new HttpLink({
  uri: 'http://localhost:8081/graphql',
});

//middlewareLink
const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

//afterwareLink
const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  }));
//connecting both the afterware and middlewareLink
const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

//creating the WebSocketLink
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8081/subscriptions`,
  options: {
    reconnect: true
  }
});

//using split to decide when to use the wslink or the middleandafterwarelink
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithMiddleware
);


//apolloCLient connects front end to the back end!
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client
