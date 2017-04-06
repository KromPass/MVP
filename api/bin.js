const crypto = require('crypto');
const config = require('../config/config.js');
const errors = require('../config/errors.js');
const { sequelize } = require('./services.js');
const models = sequelize.models;

const Bin = module.exports = {
    schema: async () => {
		let sync = await sequelize.sync({ force: true });
		return true;
	},

	dataset: async () => {
		const User = sequelize.models.user;
		const Service = sequelize.models.service;

        const password = crypto.createHash('sha256').update('password').digest('hex');

		await User.create({ email: 'damiano.barbati@gmail.com', password });
		await User.create({ email: 'baloo.cane.mucca@gmail.com', password });
		await User.create({ email: 'damiano@mvpbld.com', password });

		let services = ['CrossFit', 'Crossfit Kids', 'Weightlifting', 'Gymnastics', 'Boxe', 'Judo', 'Salsa'];
		for(let service of services)
			await Service.create({ name: service });
	},
};