'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING
		}
	);

	User.associate = (db) => {
		User.hasMany(db.List, { onDelete: 'cascade' });
	};

	User.generate_hash = (password) => bcrypt.hashSync(password, 10);

	User.prototype.toJSON = function () {
		const data = Object.assign({}, this.get());
		delete data.password;
		return data;
	};

	User.prototype.check_password = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	return User;
};
