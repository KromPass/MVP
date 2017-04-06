module.exports = {
	required(value) {
		let result = ![null, undefined, ''].includes(value);
		return result;
	},

	pattern(value, pattern) {
		value = value || '';
		let result = value.match(pattern) ? true : false;
		return result;
	},

	min(value, min) {
		let result = value.length >= min || value >= min;
		return result;
	},

	max(value, max) {
		let result = value.length <= max || value <= max;
		return result;
	},

	minLength(value, min) {
		let result = value.length >= min;
		return result;
	},

	maxLength(value, max) {
		let result = value.length <= max;
		return result;
	},
};