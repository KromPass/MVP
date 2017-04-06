const config = require('../config/config.js');
const errors = require('../config/errors.js');
const { sequelize } = require('./services.js');
const models = sequelize.models;

const Crud = module.exports = {
	get: async (args) => {
		let result;

		if(args.id)
			result = await models.user.find({ raw: true, where: { id: args.id }});
		else
			result = await models.user.findAll({ raw: true });

		return result;
	},

    add: async ({ entity, properties }) => {
		let result = await sequelize.models[entity].create(properties);
		return result;
	},

    edit: async (args) => {
		return args;
	},

    remove: async (args) => {
		return args;
	},
};