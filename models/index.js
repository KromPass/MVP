let _ = require('lodash');
let group = require('./group.js');
let user = require('./user.js');
let preference = require('./preference.js');
let article = require('./article.js');
let order = require('./order.js');
let product = require('./product.js');
let service = require('./service.js');
let payment = require('./payment.js');

let models = { group, user, preference, article, order, product, service, payment };

const defaults = {
	'id': {
		type: 'integer',
		id: true,
		readonly: true,
		hideOnAdd: true,
	},
	'addedAt': {
		type: 'datetime',
		readonly: true,
		hideOnAdd: true,
	},
	'editedAt': {
		type: 'datetime',
		readonly: true,
		hideOnAdd: true,
	},
};

let fillName = (attributes) => {
	for(let key in attributes)
		attributes[key].name = key;
};

let fillInsAndOuts = (attributes) => {
	attributes.ins = attributes.ins || [];
	attributes.outs = attributes.outs || [];
};

for(let model in models) {
	models[model] = Object.assign({}, defaults, models[model]);
	fillName(models[model]);
	fillInsAndOuts(models[model]);
}

module.exports = models;