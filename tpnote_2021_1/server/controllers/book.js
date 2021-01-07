'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Book.findAll({
			order: ['title']
		})
			.then((books) => res.json(books))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Book.findByPk(req.params.book_id)
			.then((book) => {
				if (!book) {
					throw { status: 404, message: 'Book not found' };
				}
				return res.json(book);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.Book.create(req.body)
			.then((book) => res.json(book))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Book.findByPk(req.params.book_id)
			.then((book) => {
				if (!book) {
					throw { status: 404, message: 'Book not found' };
				}
				Object.assign(book, req.body);
				return book.save();
			})
			.then((book) => res.json(book))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Book.findByPk(req.params.book_id)
			.then((book) => {
				if (!book) {
					throw { status: 404, message: 'Book not found' };
				}
				return book.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_author_of_id: (req, res, next) => {
		return db.Book.findByPk(req.params.book_id)
			.then((book) => {
				if (!book) {
					throw { status: 404, message: 'Book not found' };
				}
				return book.getAuthor();
			})
			.then((author) => res.json(author))
			.catch((err) => next(err));
	},

	get_user_of_id: (req, res, next) => {
		return db.Book.findByPk(req.params.book_id)
			.then((book) => {
				if (!book) {
					throw { status: 404, message: 'Book not found' };
				}
				return book.getUser();
			})
			.then((user) => res.json(user))
			.catch((err) => next(err));
	}

};
