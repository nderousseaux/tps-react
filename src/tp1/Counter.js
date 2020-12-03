import { useState } from 'react';

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

export default Counter