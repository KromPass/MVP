module.exports = {
	'email': {
		type: 'text',
		required: true,
		pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/i,
        unique: true,
	},
	'password': {
		type: 'password',
		required: true,
		hideOnList: true,
	},
	'firstName': {
		type: 'text',
	},
	'lastName': {
		type: 'text',
	},
	'birth': {
		type: 'date',
	},
	'stripeId': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
	'stripeToken': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
	'facebookId': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
	'facebookAccessToken': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
    'googleId': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
	'googleAccessToken': {
		type: 'text',
		hideOnAdd: true,
		hideOnList: true,
	},
	'status': {
		type: 'text',
		values: ['disabled', 'pending', 'enabled'],
		predefined: 'enabled',
	},
	ins: [{
		name: 'groups',
		model: 'group',
	}],
	outs: [{
		name: 'preferences',
		model: 'preference',
		many: true,
	},{
		name: 'orders',
		model: 'order',
		many: true,
	}],
};