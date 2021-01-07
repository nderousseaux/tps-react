'use strict';

module.exports = (sequelize, DataTypes) => {
	const Player = sequelize.define(
		'Player',
		{
			name: DataTypes.STRING
		}
	);

	Player.associate = (db) => {
		Player.belongsToMany(db.Event, { through: 'PlayerEvent' });
	};

	return Player;
};
