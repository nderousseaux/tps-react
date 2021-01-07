import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Authors = () => {
	const queryCache = useQueryCache();
	let history = useHistory()

	let {isLoading, data: author } = useQuery(
		['author'],
		() => booksAPI.getAuthors()
	);


	const [mutateDeleteAuthor] = useMutation((id) => booksAPI.removeAuthor(id));

	const deleteAuthor = (id) => {
    	mutateDeleteAuthor(id)
        	.then(() => queryCache.invalidateQueries('author'));
  	}
	return (
		<>
			<h3>Authors</h3>
			<AddAuthorForm />
			
			{isLoading ? 'Loading...' : author && <>
				<ul>
					{author?.map(a => <>
							<li key={a.id}>{a.firstname} {a.lastname} <button onClick={() => {deleteAuthor(a.id)}}>Remove</button> <button onClick={() => {history.push(`/authors/${a.id}`)}}>Details</button></li> 
						</>
					)}
				</ul>
			</>}
		</>
	);
};

let AddAuthorForm = () => {
	const queryCache = useQueryCache();

	  const [firstname, setFirstname] = useState('');
	  const [lastname, setLastname] = useState('');

  	const [mutateCreateAuthor] = useMutation((author) => booksAPI.addAuthor(author));

  	const handleSubmit = e => {
    	e.preventDefault();
    	mutateCreateAuthor({
			firstname,
			lastname
		})
        	.then(() => queryCache.invalidateQueries('author'));
  	}

  	const handleChangeF = e => {
    	setFirstname(e.target.value);
  	}

	const handleChangeL = e => {
		setLastname(e.target.value);
  	}

  	return <form onSubmit={handleSubmit}>
    	<input id='firstname' type='text' value={firstname} onChange={handleChangeF} />
		<input id='lastname' type='text' value={lastname} onChange={handleChangeL} />
    	<input type='submit' value='Ajouter' />
  	</form>;
};

let AuthorDetail = () => {
	let history = useHistory()

	let { id } = useParams();

	let {isLoading, data: book } = useQuery(
		['book'],
		() => booksAPI.getAuthorBooks(id)
	);

	return (
		<>
			<h3>Books</h3>
	
			{isLoading ? 'Loading...' : book && <>
				<ul>
					{book?.map(b => <>
							<li><a onClick={() => history.push(`/books/${id}`)}> {b.title}</a></li>
						</>
					)}
				</ul>
			</>}
			
		</>
	);
};

export {Authors, AuthorDetail};
