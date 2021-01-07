import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Books = () => {
    const queryCache = useQueryCache();
	let history = useHistory()

	let {isLoading, data: book } = useQuery(
		['book'],
		() => booksAPI.getBooks()
	);


	const [mutateDeleteBook] = useMutation((id) => booksAPI.removeBook(id));

	const deleteBook = (id) => {
    	mutateDeleteBook(id)
        	.then(() => queryCache.invalidateQueries('book'));
  	}

	return (
		<>
			<h3>Books</h3>
			<AddBookForm />
			
			{isLoading ? 'Loading...' : book && <>
				<ul>
					{book?.map(b => <>
							<li key={b.id}>{b.title} <button onClick={() => {deleteBook(b.id)}}>Remove</button> <button onClick={() => {history.push(`/books/${b.id}`)}}>Details</button></li> 
						</>
					)}
				</ul>
			</>}
		</>
	);
};

let AddBookForm = () => {
    const queryCache = useQueryCache();

    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState(0);

    let {isLoading, data: author } = useQuery(
		['author'],
		() => booksAPI.getAuthors()
	);

  	const [mutateCreateBook] = useMutation((book) => booksAPI.addBook(book));

  	const handleSubmit = e => {
    	e.preventDefault();
    	mutateCreateBook({
            title,
            AuthorId: authorId
        })
        	.then(() => queryCache.invalidateQueries('book'));
  	}

  	const handleChange = e => {
    	setTitle(e.target.value);
      }


  	return <form onSubmit={handleSubmit}>
    	<input id='title' type='text' value={title} onChange={handleChange} />

        <select value={authorId} onChange={e => setAuthorId(parseInt(e.target.value))}>
            <option key={0} value={0}>--Please select an object--</option>
            {author.map(a => <option key={a.id} value={a.id}>{a.firstname} {a.lastname}</option>)}
        </select>
    	<input type='submit' value='Ajouter' />
  	</form>;
};

let BookDetail = () => {
    let history = useHistory()

	let { id } = useParams();

    
    const [currentBook, setCurrentBook] = useState(null)
    const [author, setAuthor] = useState(null)

	let {isLoadingB, data: books } = useQuery(
		['books'],
		() => booksAPI.getBooks()
    );

    let { isLoadingA, data: authors } = useQuery(
        ["authors"], 
        () => booksAPI.getAuthors()
    );
    
    useEffect(() => {
		setCurrentBook(books?.find(b => b.id === parseInt(id)));
    }, [id, books])
    
    useEffect(() => {
		setAuthor(authors?.find(a => a.id === parseInt(currentBook.AuthorId)));
    }, [id, authors, currentBook])

	return (
		<>
			{isLoadingB ? 'Loading...' : currentBook && <>
                <h3>Book : {currentBook.name}</h3>

                <p>Title : {currentBook.title}</p>
                
                {isLoadingA ? 'Loading...' : author && <>
                    <p>Author : {author.firstname} {author.lastname}</p>
                </>}

                ... manque de temps pour la suite
            </>}
			
		</>
	);
};

export {Books, BookDetail};
