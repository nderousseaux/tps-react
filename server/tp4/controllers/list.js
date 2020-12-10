'use_strict';

const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.List.findAll()
			.then((lists) => res.json(lists))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				return res.json(list);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			title: req.body.title || '...'
		};
		return db.List.create(data)
			.then((list) => res.json(list))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				Object.assign(list, req.body);
				return list.save();
			})
			.then((list) => res.json(list))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				return list.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_items_of_id: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				return list.getItems();
			})
			.then((items) => res.json(items))
			.catch((err) => next(err));
	},

	add_item_to_id: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				const data = {
					text: req.body.text || '...'
				};
				return list.createItem(data);
			})
			.then((item) => res.json(item))
			.catch((err) => next(err));
	},

	// USER //

	is_of_user: (req, res, next) => {
		return db.List.findByPk(req.params.list_id)
			.then((list) => {
				if (!list) {
					throw { status: 404, message: 'Requested List not found' };
				}
				return list.getUser();
			})
			.then((user) => {
				if (user.id !== req.user.id) {
					throw { status: 401, message: 'This is not your List..' };
				}
				return next();
			})
			.catch((err) => next(err));
	},

	get_all_of_user: (req, res, next) => {
		return req.user.getLists()
			.then((lists) => res.json(lists))
			.catch((err) => next(err));
	},

	create_of_user: (req, res, next) => {
		const data = {
			title: req.body.title || '...'
		};
		return req.user.createList(data)
			.then((list) => res.json(list))
			.catch((err) => next(err));
	}

};
