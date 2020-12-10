'use_strict';

const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Item.findAll()
			.then((items) => res.json(items))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Item.findByPk(req.params.item_id)
			.then((item) => {
				if (!item) {
					throw { status: 404, message: 'Requested Item not found' };
				}
				return res.json(item);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			text: req.body.text || '...'
		};
		return db.Item.create(data)
			.then((item) => res.json(item))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Item.findByPk(req.params.item_id)
			.then((item) => {
				if (!item) {
					throw { status: 404, message: 'Requested Item not found' };
				}
				Object.assign(item, req.body);
				return item.save();
			})
			.then((item) => res.json(item))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Item.findByPk(req.params.item_id)
			.then((item) => {
				if (!item) {
					throw { status: 404, message: 'Requested Item not found' };
				}
				return item.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	// USER //

	is_of_user: (req, res, next) => {
		return db.Item.findByPk(req.params.item_id)
			.then((item) => {
				if (!item) {
					throw { status: 404, message: 'Requested Item not found' };
				}
				return item.getList();
			})
			.then((list) => {
				return list.getUser();
			})
			.then((user) => {
				if (user.id !== req.user.id) {
					throw { status: 401, message: 'This is not your List..' };
				}
				return next();
			})
			.catch((err) => next(err));
	}

};
