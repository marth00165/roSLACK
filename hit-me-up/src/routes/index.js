import React from 'react';
import Home from '../Home';
import Register from './register';
import Login from './login';
import CreateTeam from './CreateTeam'
import {BrowserRouter, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component = {Home} />
        <Route path="/register" exact component = {Register} />
        <Route path="/login" exact component = {Login} />
        <Route path="/create-team" exact component = {CreateTeam} />

      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
