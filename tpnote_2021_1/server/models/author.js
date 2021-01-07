'use strict';

module.exports = (sequelize, DataTypes) => {
	const Author = sequelize.define(
		'Author',
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING
		}
	);

	Author.associate = (db) => {
		Author.hasMany(db.Book, { onDelete: 'cascade' });
	};

	return Author;
};
