'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Game.findAll({
			order: ['title']
		})
			.then((games) => res.json(games))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Game.findByPk(req.params.game_id)
			.then((game) => {
				if (!game) {
					throw { status: 404, message: 'Game not found' };
				}
				return res.json(game);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.Game.create(req.body)
			.then((game) => res.json(game))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Game.findByPk(req.params.game_id)
			.then((game) => {
				if (!game) {
					throw { status: 404, message: 'Game not found' };
				}
				Object.assign(game, req.body);
				return game.save();
			})
			.then((game) => res.json(game))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Game.findByPk(req.params.game_id)
			.then((game) => {
				if (!game) {
					throw { status: 404, message: 'Game not found' };
				}
				return game.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_events_of_id: (req, res, next) => {
		return db.Game.findByPk(req.params.game_id)
			.then((game) => {
				if (!game) {
					throw { status: 404, message: 'Game not found' };
				}
				return game.getEvents();
			})
			.then((events) => res.json(events))
			.catch((err) => next(err));
	}

};
