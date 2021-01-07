import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import eventsAPI from './events_api';

let Games = () => {
	return (
		<>
			<h3>Games</h3>
		</>
	);
};

let AddGameForm = () => {
	return (
		<form>
			<button>Add</button>
		</form>
	);
};

let GameDetail = () => {
	return (
		<>
			<h4>Events planned for ...</h4>
		</>
	);
};

export default Games;
