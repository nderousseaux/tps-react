import { useState, useEffect } from 'react';   

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

  export default Toggle