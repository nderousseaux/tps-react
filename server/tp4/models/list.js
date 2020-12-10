'use strict';

module.exports = (sequelize, DataTypes) => {
	const List = sequelize.define(
		'List',
		{
			title: DataTypes.STRING
		}
	);

	List.associate = (db) => {
		List.hasMany(db.Item, { onDelete: 'cascade' });
		List.belongsTo(db.User, { onDelete: 'cascade' });
	};

	return List;
};
