import { useState } from 'react';

const Swapi = () => {

  let [people, setPeople] = useState(null);
  let [loading, setLoading] = useState(false);
  let [clickButton, setClickButton] = useState(false);
  let [error, setError] = useState(null)

  let loadData = (url) => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPeople(data);
        setLoading(false);
       })
      .catch(err => {
        setError(`Erreur avec le message : ${err}`)
      });
  }

  let handleClick = (url) => {
    setClickButton(true)
    loadData(url);
  };

  return <>
    <h2>SWAPI</h2>

    <button onClick={() => handleClick('https://swapi.dev/api/people/')}> Load People</button>

    {error ? error : <>
      {clickButton ? <>
        {loading ? 'Loading...' : people && <>
          <ul>
            {people.results.map(p => <li key={p.url}>{p.name}</li>)}
          </ul>

          {people.previous ? 
            <button onClick={() => handleClick(people.previous)}>Précédent</button> :
            ''
          }
          
          {people.next ? 
            <button onClick={() => handleClick(people.next)}>Suivant</button> :
            ''
          }
          
        </>} </> : 'Cliquez sur le bouton'
      }
    </>}
  </>;
}

export default Swapi;
