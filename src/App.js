import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import Swapi from './Swapi'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {QueryCache, ReactQueryCacheProvider} from 'react-query';


const queryCache = new QueryCache()

let Toggle = ({ onChange }) => {
  let [t, setT] = useState(false);
  let handleClick = () => {
    setT(c => !c);
  };
  useEffect(() => { onChange(t); }, [t]);
  return <p>
    Toggle value :
    {t ? 'true' : 'false'}
    <button onClick={handleClick}>Change</button>
  </p>;
};

let Counter = () => {
  let [c, setC] = useState(0);
  let handleClick = () => {
    setC(v => v + 1);
  };
  return <div>
    <span>Value : {c}</span>
    <button onClick={handleClick}>Inc</button>
    <button onClick={() => setC(0)}>Reset</button>
  </div>;
};

let App = () => {
  let [count, setCount] = useState(0);
  let handleToggleChange = (v) => {
    if (v) {
      setCount(c => c + 1);
    }
  };
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
          </nav>
          <Switch>
            <Route path="/tp1">
              <Toggle onChange={handleToggleChange} />
              <p>Toggle true count : {count}</p>
              <Counter />
              <TodoList />
            </Route>
            <Route path="/tp2">
              <Swapi />
            </Route>
            <Route path="/">
              <></>
            </Route>
          </Switch>
        </div>
      </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;
