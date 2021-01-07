import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Users = () => {
	return (
		<>
			<h3>Users</h3>
		</>
	);
};

let AddUserForm = () => {
	return (
		<form>
			<button>Add</button>
		</form>
	);
};

let UserDetail = () => {
	return (
		<>
			<h4>User books</h4>
		</>
	);
};

export default Users;
