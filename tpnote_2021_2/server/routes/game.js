'use strict';

const game_ctrl = require('../controllers/game');

module.exports = [

	{
		url: '/game',
		method: 'get',
		func: game_ctrl.get_all
	},
	{
		url: '/game',
		method: 'post',
		func: game_ctrl.create
	},
	{
		url: '/game/:game_id',
		method: 'get',
		func: game_ctrl.get_by_id
	},
	{
		url: '/game/:game_id',
		method: 'put',
		func: game_ctrl.update_by_id
	},
	{
		url: '/game/:game_id',
		method: 'delete',
		func: game_ctrl.delete_by_id
	},
	{
		url: '/game/:game_id/events',
		method: 'get',
		func: game_ctrl.get_events_of_id
	}

];
