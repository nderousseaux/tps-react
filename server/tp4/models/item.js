'use strict';

module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define(
		'Item',
		{
			text: DataTypes.STRING
		}
	);

	Item.associate = (db) => {
		Item.belongsTo(db.List, { onDelete: 'cascade' });
	};

	return Item;
};
