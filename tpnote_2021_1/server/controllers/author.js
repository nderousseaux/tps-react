'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Author.findAll({
			order: ['lastname']
		})
			.then((authors) => res.json(authors))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Author.findByPk(req.params.author_id)
			.then((author) => {
				if (!author) {
					throw { status: 404, message: 'Author not found' };
				}
				return res.json(author);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.Author.create(req.body)
			.then((author) => res.json(author))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Author.findByPk(req.params.author_id)
			.then((author) => {
				if (!author) {
					throw { status: 404, message: 'Author not found' };
				}
				Object.assign(author, req.body);
				return author.save();
			})
			.then((author) => res.json(author))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Author.findByPk(req.params.author_id)
			.then((author) => {
				if (!author) {
					throw { status: 404, message: 'Author not found' };
				}
				return author.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_books_of_id: (req, res, next) => {
		return db.Author.findByPk(req.params.author_id)
			.then((author) => {
				if (!author) {
					throw { status: 404, message: 'Author not found' };
				}
				return author.getBooks();
			})
			.then((books) => res.json(books))
			.catch((err) => next(err));
	}

};
