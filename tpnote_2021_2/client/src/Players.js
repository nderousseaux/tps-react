import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import eventsAPI from './events_api';

let Players = () => {
	return (
		<>
			<h3>Players</h3>
		</>
	);
};

let AddPlayerForm = () => {
	return (
		<form>
			<button>Add</button>
		</form>
	);
};

let PlayerDetail = () => {
	return (
		<>
			<h4>Events planned for ...</h4>
		</>
	);
};

export default Players;
