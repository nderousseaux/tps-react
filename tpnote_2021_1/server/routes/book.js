'use strict';

const
book_ctrl = require('../controllers/book');

module.exports = [
	
	{
		url: '/book',
		method: 'get',
		func: book_ctrl.get_all
	},
	{
		url: '/book',
		method: 'post',
		func: book_ctrl.create
	},
	{
		url: '/book/:book_id',
		method: 'get',
		func: book_ctrl.get_by_id
	},
	{
		url: '/book/:book_id',
		method: 'put',
		func: book_ctrl.update_by_id
	},
	{
		url: '/book/:book_id',
		method: 'delete',
		func: book_ctrl.delete_by_id
	},
	{
		url: '/book/:book_id/author',
		method: 'get',
		func: book_ctrl.get_author_of_id
	},
	{
		url: '/book/:book_id/user',
		method: 'get',
		func: book_ctrl.get_user_of_id
	},
	// {
	// 	url: '/book/:book_id/user',
	// 	method: 'post',
	// 	func: book_ctrl.set_user_of_id
	// },
	// {
	// 	url: '/book/:book_id/user',
	// 	method: 'delete',
	// 	func: book_ctrl.delete_user_of_id
	// }

];
