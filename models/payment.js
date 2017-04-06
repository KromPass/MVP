module.exports = {
	'stripeId': {
		type: 'text',
		required: true,
	},
	'amount': {
		type: 'float',
		required: true,
		min: 0,
	},
};