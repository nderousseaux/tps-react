'use strict';

const player_ctrl = require('../controllers/player');

module.exports = [

	{
		url: '/player',
		method: 'get',
		func: player_ctrl.get_all
	},
	{
		url: '/player',
		method: 'post',
		func: player_ctrl.create
	},
	{
		url: '/player/:player_id',
		method: 'get',
		func: player_ctrl.get_by_id
	},
	{
		url: '/player/:player_id',
		method: 'put',
		func: player_ctrl.update_by_id
	},
	{
		url: '/player/:player_id',
		method: 'delete',
		func: player_ctrl.delete_by_id
	},
	{
		url: '/player/:player_id/events',
		method: 'get',
		func: player_ctrl.get_events_of_id
	}

];
