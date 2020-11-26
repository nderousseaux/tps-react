import { useState } from 'react';
import {useQuery} from 'react-query';



const Swapi = () => {

  let [character, setCharacter] = useState(null);
  let [page, setPage] = useState(1);



  let CharacterDetails = () => {
    return <div>
      <p>
          Nom: {character.name}<br />
          Genre: {character.gender} <br />
          Taille: {character.height/100}<br />
          Poid: {character.mass} kg<br />
          Couleur des cheveux: {character.hair_color}<br />
          Couleur de la peau: {character.skin_color}<br />
          Couleur des yeux: {character.eye_color}<br />
          Date de naissance: {character.birth_year}<br />
          </p>
      </div>
  };

  let {isLoading, data: people } = useQuery(
    ['people', page],
    () => fetch(`https://swapi.dev/api/people/?page=${page}`)
          .then(res => res.json())
  );

  return <>
    <h2>SWAPI</h2>
    {isLoading ? 'Loading...' : people && <>
      <ul>
        {people?.results.map(p => <li key={p.url} onClick={() => {setCharacter(p)}}>{p.name}</li>)}
      </ul>

      <button onClick={() => {setPage(p => p - 1)}} disabled={people?.previous ? "" : "disabled"}>Previous</button><br />
      <button onClick={() => {setPage(p => p + 1)}} disabled={people?.next ? "" : "disabled"}>Next</button>
    </>}
    {character ? <CharacterDetails /> : ''}  
  </>;
}

export default Swapi;
