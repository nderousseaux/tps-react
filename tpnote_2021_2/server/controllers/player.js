'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Player.findAll({
			order: ['name']
		})
			.then((players) => res.json(players))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Player.findByPk(req.params.player_id)
			.then((player) => {
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				return res.json(player);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.Player.create(req.body)
			.then((player) => res.json(player))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Player.findByPk(req.params.player_id)
			.then((player) => {
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				Object.assign(player, req.body);
				return player.save();
			})
			.then((player) => res.json(player))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Player.findByPk(req.params.player_id)
			.then((player) => {
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				return player.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_events_of_id: (req, res, next) => {
		return db.Player.findByPk(req.params.player_id)
			.then((player) => {
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				return player.getEvents();
			})
			.then((events) => res.json(events))
			.catch((err) => next(err));
	}

};
