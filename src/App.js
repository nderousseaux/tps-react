import { useState, useEffect } from 'react';

import TodoList from './TodoList';
import Swapi from './Swapi'

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
    <div className="App">
      <h1> TP 1</h1>
      <Toggle onChange={handleToggleChange} />
      <p>Toggle true count : {count}</p>
      <Counter />
      <TodoList />
      <h1> TP 2 </h1>
      <Swapi />
    </div>
  );
}

export default App;
