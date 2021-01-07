import { checkStatus, url_prefix } from './fetch_utils';

let booksAPI = {

	getUsers: () => {
		return fetch(`${url_prefix}/user`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addUser: (user) => {
		return fetch(`${url_prefix}/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removeUser: (id) => {
		return fetch(`${url_prefix}/user/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getAuthors: () => {
		return fetch(`${url_prefix}/author`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addAuthor: (author) => {
		return fetch(`${url_prefix}/author`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(author)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removeAuthor: (id) => {
		return fetch(`${url_prefix}/author/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getBooks: () => {
		return fetch(`${url_prefix}/book`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addBook: (book) => {
		return fetch(`${url_prefix}/book`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(book)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removeBook: (id) => {
		return fetch(`${url_prefix}/book/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getAuthorBooks: (authorId) => {
		return fetch(`${url_prefix}/author/${authorId}/books`)
			.then(checkStatus)
			.then(res => res.json());
	},

	getUserBooks: (userId) => {
		return fetch(`${url_prefix}/user/${userId}/books`)
			.then(checkStatus)
			.then(res => res.json());
	},

	updateBook: ({ bookId, changes }) => {
		return fetch(`${url_prefix}/book/${bookId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(changes)
		})
			.then(checkStatus)
			.then(res => res.json());
	}

};

export default booksAPI;
