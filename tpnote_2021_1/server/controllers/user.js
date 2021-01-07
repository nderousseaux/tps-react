'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.User.findAll({
			order: ['name']
		})
			.then((users) => res.json(users))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then((user) => {
				if (!user) {
					throw { status: 404, message: 'User not found' };
				}
				return res.json(user);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then((user) => {
				if (!user) {
					throw { status: 404, message: 'User not found' };
				}
				Object.assign(user, req.body);
				return user.save();
			})
			.then((user) => res.json(user))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then((user) => {
				if (!user) {
					throw { status: 404, message: 'User not found' };
				}
				return user.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_books_of_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then((user) => {
				if (!user) {
					throw { status: 404, message: 'User not found' };
				}
				return user.getBooks();
			})
			.then((books) => res.json(books))
			.catch((err) => next(err));
	}

};
