import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import { ApolloProvider } from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.min.css'
import client from './apollo';


const App = (
  <ApolloProvider client = {client}>
    <Routes />
  </ApolloProvider>
);


ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();
