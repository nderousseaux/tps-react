import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Users = () => {
	const queryCache = useQueryCache();
	let history = useHistory()

	let {isLoading, data: user } = useQuery(
		['user'],
		() => booksAPI.getUsers()
	);


	const [mutateDeleteUser] = useMutation((id) => booksAPI.removeUser(id));

	const deleteUser = (id) => {
    	mutateDeleteUser(id)
        	.then(() => queryCache.invalidateQueries('user'));
  	}

	return (
		<>
			<h3>Users</h3>
			<AddUserForm />
			
			{isLoading ? 'Loading...' : user && <>
				<ul>
					{user?.map(u => <>
							<li key={u.id}>{u.name} <button onClick={() => {deleteUser(u.id)}}>Remove</button> <button onClick={() => {history.push(`/users/${u.id}`)}}>Details</button></li> 
						</>
					)}
				</ul>
			</>}
		</>
	);
};

let AddUserForm = () => {
	const queryCache = useQueryCache();

  	const [user, setUser] = useState('');

  	const [mutateCreateUser] = useMutation((user) => booksAPI.addUser({name:user}));

  	const handleSubmit = e => {
    	e.preventDefault();
    	mutateCreateUser(user)
        	.then(() => queryCache.invalidateQueries('user'));
  	}

  	const handleChange = e => {
    	setUser(e.target.value);
  	}

  	return <form onSubmit={handleSubmit}>
    	<input id='user' type='text' value={user} onChange={handleChange} />
    	<input type='submit' value='Ajouter' />
  	</form>;

};

let UserDetail = () => {
	let history = useHistory()

	let { id } = useParams();

	let {isLoading, data: book } = useQuery(
		['book'],
		() => booksAPI.getUserBooks(id)
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

export {Users, UserDetail};
