'use strict';

module.exports = (sequelize, DataTypes) => {
	const Game = sequelize.define(
		'Game',
		{
			title: DataTypes.STRING
		}
	);

	Game.associate = (db) => {
		Game.hasMany(db.Event, { onDelete: 'cascade' });
	};

	return Game;
};
