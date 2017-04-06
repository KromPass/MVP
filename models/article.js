module.exports = {
	'availableAt': {
		type: 'datetime',
		required: true,
	},
	'title': {
		type: 'text',
		required: true,
		min: 6,
		max: 50,
	},
	'content': {
		type: 'text',
		required: true,
		min: 6,
		max: 50000,
	},
	'category': {
		type: 'text',
		required: true,
		min: 3,
		max: 10,
		pattern: /^[a-z\s'\u00C0-\u017F]+$/i,
	},
	'tags': {
		array: true,
		type: 'text',
		minLength: 1,
		maxLength: 10,
		min: 3,
		max: 10,
		pattern: /^[a-z\s'\u00C0-\u017F]+$/i,
	},
	// 'author': {
	// 	reference: 'user',
	// 	required: true,
	// },
};