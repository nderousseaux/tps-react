'use strict';

const
author_ctrl = require('../controllers/author');

module.exports = [
	
	{
		url: '/author',
		method: 'get',
		func: author_ctrl.get_all
	},
	{
		url: '/author',
		method: 'post',
		func: author_ctrl.create
	},
	{
		url: '/author/:author_id',
		method: 'get',
		func: author_ctrl.get_by_id
	},
	{
		url: '/author/:author_id',
		method: 'put',
		func: author_ctrl.update_by_id
	},
	{
		url: '/author/:author_id',
		method: 'delete',
		func: author_ctrl.delete_by_id
	},
	{
		url: '/author/:author_id/books',
		method: 'get',
		func: author_ctrl.get_books_of_id
	}
	
];
