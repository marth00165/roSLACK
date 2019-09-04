import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.min.css'

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
});

const App = (
<ApolloProvider client = {client}>
  <Routes />
</ApolloProvider>

);


ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();
