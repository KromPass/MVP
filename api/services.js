const _ = require('lodash');
const config = require('../config/config.js');
const errors = require('../config/errors.js');
const models = require('../models');
const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');

const sequelize = new Sequelize(config.connection.string, {
	dialect: config.connection.engine, storage: config.connection.storage,
	define: { freezeTableName: true, timestamps: false },
});

const typeToSequelizeTypes = (type, array, values) => {
	let sequelizeTypes = {
		text: Sequelize.TEXT,
		integer: Sequelize.INTEGER,
		float: Sequelize.FLOAT,
		datetime: Sequelize.INTEGER,
		date: Sequelize.INTEGER,
		password: Sequelize.TEXT,
	};

	if(array)
		return Sequelize.ARRAY(sequelizeTypes[type]);
	else if(values)
		return Sequelize.ENUM(...values);
	else
		return sequelizeTypes[type];
};

sequelize.models = {};

_.forIn(models, (modelAttributes, modelName) => {
	let definition = {};

	_.forIn(modelAttributes, (attribute, attributeName) => {
		if(['ins', 'outs'].includes(attributeName))
			return;

		//id auto added by sequelize
		if(attributeName == 'id')
			return;

		// console.log(`processing ${modelName}.${attributeName}`);
		definition[attributeName] = {
			type: typeToSequelizeTypes(attribute.type, attribute.array, attribute.values),
			primaryKey: attribute.id ? true : false,
			unique: attribute.unique ? true : false,
			allowNull: attribute.required ? false : true,
		};

		// if(attribute.reference) {
		// 	definition[attributeName].type = typeToSequelizeTypes('integer');
		// 	definition[attributeName].references = {
		// 		model: attribute.reference,
		// 		key: 'id',
		// 	};
		// }
	});
	sequelize.models[modelName] = sequelize.define(modelName.toLowerCase(), definition);
});

// _.forIn(models, (modelAttributes, modelName) => {
// 	for(let _in of modelAttributes.ins) {
// 		let source = modelName;
// 		let target = _in.model;
// 		let as = _in.name;
// 		console.log('in:', target, '=>', source);
// 		sequelize.models[modelName].belongsTo(sequelize.models[target], { as, through: `${source}${_.capitalize(as)}` });
// 	}
//
// 	for(let _out of modelAttributes.outs) {
// 		let source = modelName;
// 		let target = _out.model;
// 		let as = _out.name;
// 		console.log('out:', source, '=>', target, sequelize.models[target]);
// 		if(!_out.many)
// 			sequelize.models[modelName].hasOne(sequelize.models[target], { as, through: `${source}${_.capitalize(as)}` });
// 		else
// 			sequelize.models[modelName].hasMany(sequelize.models[target], { as });
// 	}
// });

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: config.gmail.username,
		pass: config.gmail.password,
	}
});

const mail = function * ({ sender, recipient, title, content, html = true }) {
	let settings = {
		from: sender,
		to: recipient,
		subject: title,
		[html ? 'html' : 'text']: content,
	};
	let result = yield transporter.sendMail(settings);
	console.log('email=>', result);
	return result;
};

module.exports = { sequelize, mail };