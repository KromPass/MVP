import _ from 'lodash';

import {
	CLEAN, LOADING, SUCCESS, FAILURE,
	FORM_INIT, FORM_RESET, FORM_SUBMIT,
	PUSH_INPUT, EDIT_INPUT, ERROR, VALID, CHANGE, BLUR,
} from './form.actions.js';

const defaultState = {};

const defaultFormState = {
	values: {},
	originalValues: {},
	pristine: true,
	valid: true,
	inputs: {},
};

const defaultInputState = {
	value: null,
	originalValue: null,
	pristine: true,
	blurred: false,
	valid: true,
	errors: [],
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	let { formName, input, name, value, values } = action;

	state[formName] = state[formName] || _.cloneDeep(defaultFormState);
	let form = state[formName];

	switch(action.type) {
		case FORM_INIT:
			if(typeof formName === 'undefined')
				throw 'formName can\'t be undefined';

			state[formName] = state[formName] || Object.assign({}, defaultFormState);
			if(values) {
				form.originalValues = _.cloneDeep(values);
				form.values = _.cloneDeep(form.originalValues);
				_.each(values, (value, key) => form.inputs[key].value = value);
			}
			return state;
		case FORM_RESET:
			if(typeof formName === 'undefined')
				throw 'formName can\'t be undefined';

			form.values = _.cloneDeep(form.originalValues);
			_.each(values, (value, key) => form.inputs[key].value = value);
			return state;
		case FORM_SUBMIT:
			if(typeof formName === 'undefined')
				throw 'formName can\'t be undefined';

			form.submitted = true;
			return state;
		case PUSH_INPUT:
			if(typeof formName === 'undefined')
				throw 'formName can\'t be undefined';

			form.inputs[input.name] = Object.assign({}, input, defaultInputState);
			return state;
		case EDIT_INPUT:
			if(typeof formName === 'undefined')
				throw 'formName can\'t be undefined';

			form.inputs[input.name] = Object.assign(form.inputs[input.name], input);
			return state;
		case CHANGE:
		if(typeof formName === 'undefined')
			throw 'formName can\'t be undefined';

			form.values[name] = value;
			form.inputs[name].value = value;
			form.inputs[name].pristine = false;
			return state;
		case BLUR:
		if(typeof formName === 'undefined')
			throw 'formName can\'t be undefined';

			form.inputs[name].blurred = true;
			return state;
		case ERROR:
		if(typeof formName === 'undefined')
			throw 'formName can\'t be undefined';

			let errors = value;
			let valid = true;
			let errorText = '';
			_.each(errors, (value, key) => {
				if(value) {
					valid = false;
					errorText = `${errorText}${key}\n`;
				}
			});
			form.inputs[name].errors = errors;
			form.inputs[name].valid = valid;
			form.inputs[name].errorText = errorText;

			form.valid = true;
			_.each(form.inputs, (input) => form.valid = !!(form.valid && input.valid));

			return state;
		case CLEAN:
		if(typeof formName === 'undefined')
			throw 'formName can\'t be undefined';

			return _.cloneDeep(defaultState);
		default:
			return previousState;
	}
};

export default reducer;