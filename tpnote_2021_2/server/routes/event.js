'use strict';

const event_ctrl = require('../controllers/event');

module.exports = [

	{
		url: '/event',
		method: 'get',
		func: event_ctrl.get_all
	},
	{
		url: '/event',
		method: 'post',
		func: event_ctrl.create
	},
	{
		url: '/event/:event_id',
		method: 'get',
		func: event_ctrl.get_by_id
	},
	{
		url: '/event/:event_id',
		method: 'put',
		func: event_ctrl.update_by_id
	},
	{
		url: '/event/:event_id',
		method: 'delete',
		func: event_ctrl.delete_by_id
	},
	{
		url: '/event/:event_id/game',
		method: 'get',
		func: event_ctrl.get_game_of_id
	},
	{
		url: '/event/:event_id/players',
		method: 'get',
		func: event_ctrl.get_players_of_id
	},
	{
		url: '/event/:event_id/players/:player_id',
		method: 'post',
		func: event_ctrl.add_player_to_id
	},
	{
		url: '/event/:event_id/players/:player_id',
		method: 'delete',
		func: event_ctrl.remove_player_from_id
	}

];
