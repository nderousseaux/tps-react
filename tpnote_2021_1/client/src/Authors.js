import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Authors = () => {
	return (
		<>
			<h3>Authors</h3>
		</>
	);
};

let AddAuthorForm = () => {
	return (
		<form>
			<button>Add</button>
		</form>
	);
};

let AuthorDetail = () => {
	return (
		<>
			<h4>Books written by ...</h4>
		</>
	);
};

export default Authors;
