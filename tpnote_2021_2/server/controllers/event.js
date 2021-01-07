'use_strict';

const
	db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Event.findAll({
			order: ['date']
		})
			.then((events) => res.json(events))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Event.findByPk(req.params.event_id)
			.then((event) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				return res.json(event);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		return db.Event.create(req.body)
			.then((event) => res.json(event))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Event.findByPk(req.params.event_id)
			.then((event) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				Object.assign(event, req.body);
				return event.save();
			})
			.then((event) => res.json(event))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Event.findByPk(req.params.event_id)
			.then((event) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				return event.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_game_of_id: (req, res, next) => {
		return db.Event.findByPk(req.params.event_id)
			.then((event) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				return event.getGame();
			})
			.then((game) => res.json(game))
			.catch((err) => next(err));
	},

	get_players_of_id: (req, res, next) => {
		return db.Event.findByPk(req.params.event_id)
			.then((event) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				return event.getPlayers();
			})
			.then((players) => res.json(players))
			.catch((err) => next(err));
	},

	add_player_to_id: (req, res, next) => {
		return Promise.all([
			db.Event.findByPk(req.params.event_id),
			db.Player.findByPk(req.params.player_id)
		])
			.then(([event, player]) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				return event.addPlayer(player);
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	remove_player_from_id: (req, res, next) => {
		return Promise.all([
			db.Event.findByPk(req.params.event_id),
			db.Player.findByPk(req.params.player_id)
		])
			.then(([event, player]) => {
				if (!event) {
					throw { status: 404, message: 'Event not found' };
				}
				if (!player) {
					throw { status: 404, message: 'Player not found' };
				}
				return event.removePlayer(player);
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

};
