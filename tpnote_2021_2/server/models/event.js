'use strict';

module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define(
		'Event',
		{
			date: DataTypes.DATEONLY
		}
	);

	Event.associate = (db) => {
		Event.belongsTo(db.Game, { onDelete: 'cascade' });
		Event.belongsToMany(db.Player, { through: 'PlayerEvent' });
	};

	return Event;
};
