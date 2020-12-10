'use strict';

const
	fs = require('fs'),
	Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('[DBname]', '[username]', '[password]', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true }
	// operatorsAliases: false
	// logging: false
});

const db = {};

fs.readdirSync(__dirname)
	.filter((filename) => filename !== 'index.js')
	.forEach((filename) => {
		const model = require('./' + filename)(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	db[modelName].associate(db);
});

sequelize.sync();

module.exports = db;
