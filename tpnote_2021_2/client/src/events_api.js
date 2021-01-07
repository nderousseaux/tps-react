import { checkStatus, url_prefix } from './fetch_utils';

const eventsAPI = {

	getPlayers: () => {
		return fetch(`${url_prefix}/player`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addPlayer: (player) => {
		return fetch(`${url_prefix}/player`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(player)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removePlayer: (id) => {
		return fetch(`${url_prefix}/player/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getGames: () => {
		return fetch(`${url_prefix}/game`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addGame: (game) => {
		return fetch(`${url_prefix}/game`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(game)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removeGame: (id) => {
		return fetch(`${url_prefix}/game/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getEvents: () => {
		return fetch(`${url_prefix}/event`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addEvent: (event) => {
		return fetch(`${url_prefix}/event`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(event)
		})
			.then(checkStatus)
			.then(res => res.json());
	},

	removeEvent: (id) => {
		return fetch(`${url_prefix}/event/${id}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

	getPlayerEvents: (playerId) => {
		return fetch(`${url_prefix}/player/${playerId}/events`)
			.then(checkStatus)
			.then(res => res.json());
	},

	getGameEvents: (gameId) => {
		return fetch(`${url_prefix}/game/${gameId}/events`)
			.then(checkStatus)
			.then(res => res.json());
	},

	getEventPlayers: (eventId) => {
		return fetch(`${url_prefix}/event/${eventId}/players`)
			.then(checkStatus)
			.then(res => res.json());
	},

	addPlayerToEvent: ({ eventId, playerId }) => {
		return fetch(`${url_prefix}/event/${eventId}/players/${playerId}`, {
			method: 'POST'
		})
			.then(checkStatus);
	},

	removePlayerFromEvent: ({ eventId, playerId }) => {
		return fetch(`${url_prefix}/event/${eventId}/players/${playerId}`, {
			method: 'DELETE'
		})
			.then(checkStatus);
	},

};

export default eventsAPI;
