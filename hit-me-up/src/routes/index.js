import React from 'react';
import Home from '../Home';
import decode from 'jwt-decode'
import Register from './register';
import Login from './login';
import ViewTeam from './ViewTeam';
import CreateTeam from './CreateTeam'
import {Redirect, BrowserRouter, Switch, Route} from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))}
  />
);



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component = {Home} />
        <Route path="/register" exact component = {Register} />
        <Route path="/login" exact component = {Login} />
        <Route path="/view-team" exact component = {ViewTeam} />
        <PrivateRoute path="/create-team" exact component = {CreateTeam} />

      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
