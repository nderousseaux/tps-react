import { useState } from 'react';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import {QueryCache, ReactQueryCacheProvider} from 'react-query';

import Tp1 from './tp1/Tp1'
import Tp2 from './tp2/Tp2'

//Imports du tp3
import Home from './tp3/Home'
import Signup from './tp3/Signup'
import Signin from './tp3/Signin'

const queryCache = new QueryCache()

//TODO: Gestion des erreurs

let App = () => {

  let [user, setUser] = useState(null);

  let history = useHistory()

  const connect = (id, mdp) => {
    let body = { username: id, password: mdp}
    fetch("http://localhost:4200/signin", {method: 'POST',   headers: { 'Content-Type': 'application/json' },body: JSON.stringify(body)})
    .then(() => {
      history.push("/") //FIXME: HISTORY is undefined ?
      console.log("salut") //TODO: Connexion
    }) 
    .catch((err) => console.log(err))
  };

  const createUser = (id, mdp) => {
    let body = { username: id, password: mdp}
    fetch("http://localhost:4200/signup", {method: 'POST',   headers: { 'Content-Type': 'application/json' },body: JSON.stringify(body)})
    .catch((err) => console.log(err)) //FIXME: Inscription
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/tp1">TP n°1</Link>
              </li>
              <li>
                <Link to="/tp2">TP n°2</Link>
              </li>
            </ul>
            <h1>TP n° 3</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              { user != null ? <>
                <li>
                  <Link to="/signout">Signout</Link>
                </li>
                <p>User : { user.username }</p> 
                </> :
                <>
                  <li>
                    <Link to="/signin">Signin</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              }
            </ul>
          </nav>
          <Switch>
            <Route path="/tp1">
              <Tp1/>
            </Route>
            <Route path="/tp2">
              <Tp2/>
            </Route>
            <Route path="/signin">
              <Signin connect={connect}/>
            </Route>
            <Route path="/signup">
              <Signup createUser={createUser}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;
