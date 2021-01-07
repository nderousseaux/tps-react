'use strict';

module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		'Book',
		{
			title: DataTypes.STRING
		}
	);

	Book.associate = (db) => {
		Book.belongsTo(db.Author, { onDelete: 'cascade' });
		Book.belongsTo(db.User);
	};

	return Book;
};
