'use strict';

const
	list_ctrl = require('../controllers/list'),
	user_ctrl = require('../controllers/user');

module.exports = [

	{
		url: '/list',
		method: 'get',
		func: [user_ctrl.identify_client, list_ctrl.get_all_of_user]
	},
	{
		url: '/list',
		method: 'post',
		func: [user_ctrl.identify_client, list_ctrl.create_of_user]
	},
	{
		url: '/list/:list_id',
		method: 'get',
		func: [user_ctrl.identify_client, list_ctrl.is_of_user, list_ctrl.get_by_id]
	},
	{
		url: '/list/:list_id',
		method: 'put',
		func: [user_ctrl.identify_client, list_ctrl.is_of_user, list_ctrl.update_by_id]
	},
	{
		url: '/list/:list_id',
		method: 'delete',
		func: [user_ctrl.identify_client, list_ctrl.is_of_user, list_ctrl.delete_by_id]
	},
	{
		url: '/list/:list_id/items',
		method: 'get',
		func: [user_ctrl.identify_client, list_ctrl.is_of_user, list_ctrl.get_items_of_id]
	},
	{
		url: '/list/:list_id/items',
		method: 'post',
		func: [user_ctrl.identify_client, list_ctrl.is_of_user, list_ctrl.add_item_to_id]
	},

];
