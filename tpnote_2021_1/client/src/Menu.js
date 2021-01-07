import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
	return <ul>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/users">Users</Link></li>
		<li><Link to="/authors">Authors</Link></li>
		<li><Link to="/books">Books</Link></li>
	</ul>
};

export default Menu;
