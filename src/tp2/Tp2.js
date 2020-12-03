import { useState } from 'react';
import {useQuery} from 'react-query';

const Swapi = () => {
  
  let [character, setCharacter] = useState(null);

  const Film = (url) => {
    const {isLoading, data: film} = useQuery(
      [url],
      () => fetch(url.film).then(res => res.json())
    );

    return  <li>{
      isLoading ? 'loading ...' : film && <ul>
          <li>Titre : {film?.title}</li>
          <li>Episode : {film?.episode_id}</li>
          <li>Texte : {film?.opening_crawl}</li>
          <li>Directeur : {film?.director}</li>
          <li>Producteur : {film?.producor}</li>
          <li>Date de sortie : {film?.release_date}</li>
      </ul>
    }</li>;

  }

  const CharacterDetails = () => {
    return <div>
      <p>Nom: {character.name}</p>
      <p>Genre: {character.gender}</p>
      <p>Taille: {character.height/100}</p>
      <p>Poid: {character.mass} kg</p>
      <p>Couleur des cheveux: {character.hair_color}</p>
      <p>Couleur de la peau: {character.skin_color}</p>
      <p>Couleur des yeux: {character.eye_color}</p>
      <p>Date de naissance: {character.birth_year}</p>
      <ul>
        { character.films?.map(f => {return <Film film={f} />})}
      </ul>
    </div>
  };
  

  const List = () => {
  
    let [page, setPage] = useState(1);
  
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
    </>;
  }


  return <>
    <List />
    {character ? <CharacterDetails /> : ''}  
  </>
  
}


export default Swapi;
