'use strict';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: DataTypes.STRING
		}
	);

	User.associate = (db) => {
		User.hasMany(db.Book);
	};

	return User;
};
