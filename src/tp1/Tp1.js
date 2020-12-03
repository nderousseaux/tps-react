import { useState } from 'react';

import Toggle from './Toggle'
import Counter from './Counter'
import TodoList from './TodoList';

const Tp1 = () => {

    let [count, setCount] = useState(0);
    let handleToggleChange = (v) => {
      if (v) {
        setCount(c => c + 1);
      }
    };
  

    return(<>
        <Toggle onChange={handleToggleChange} />
        <p>Toggle true count : {count}</p>
        <Counter />
        <TodoList />        
    </>
    )
}

export default Tp1