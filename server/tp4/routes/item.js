'use strict';

const
	item_ctrl = require('../controllers/item');

module.exports = [

	{
		url: '/item',
		method: 'get',
		func: [item_ctrl.get_all]
	},
	{
		url: '/item',
		method: 'post',
		func: [item_ctrl.create]
	},
	{
		url: '/item/:item_id',
		method: 'get',
		func: [item_ctrl.get_by_id]
	},
	{
		url: '/item/:item_id',
		method: 'put',
		func: [item_ctrl.update_by_id]
	},
	{
		url: '/item/:item_id',
		method: 'delete',
		func: [item_ctrl.delete_by_id]
	}

];
