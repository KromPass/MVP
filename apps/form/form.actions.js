export const CLEAN = 'CLEAN';
export const LOADING = 'FORM_LOADING';
export const SUCCESS = 'FORM_SUCCESS';
export const FAILURE = 'FORM_LOADING';

export const FORM_INIT = 'FORM_FORM_INIT';
export const FORM_RESET = 'FORM_FORM_RESET';
export const FORM_SUBMIT = 'FORM_FORM_SUBMIT';

export const PUSH_INPUT = 'FORM_PUSH_INPUT';
export const EDIT_INPUT = 'FORM_EDIT_INPUT';
export const POP_INPUT = 'FORM_POP_INPUT';
export const ERROR = 'FORM_ERROR';
export const VALID = 'FORM_VALID';
export const CHANGE = 'FORM_CHANGE';
export const BLUR = 'FORM_BLUR';

import validators from '../helpers/validators.js';

export const clean = () => ({ type: CLEAN });

export const initForm = ({ formName, values }) => {
	return { type: FORM_INIT, formName, values };
};

export const resetForm = ({ formName }) => {
	return { type: FORM_RESET, formName };
};

export const submitForm = ({ formName, form, submit }) => {
	return async (dispatch) => {
		dispatch(syncValidateForm({ formName, form}));
		dispatch({ type: FORM_SUBMIT, formName, submit });
		await submit();
	};
};

export const pushInput = ({ formName, input, name }) => {
	return { type: PUSH_INPUT, formName, input, name };
};

export const editInput = ({ formName, input, name }) => {
	return { type: EDIT_INPUT, formName, input, name };
};

export const change = ({ formName, input, name, value }) => {
	return dispatch => {
		dispatch({ type: CHANGE, formName, name, value });
		if(input.blurred)
			dispatch(syncValidateInput({ formName, input, name, value }));
	};
};

export const blur = ({ formName, input, name }) => {
	return dispatch => {
		dispatch({ type: BLUR, formName, name });
		dispatch(syncValidateInput({ formName, input, name, value: input.value }));
	};
};

export const syncValidateInput = ({ formName, input, name, value }) => {
	let errors = {};

	for(let validatorName in validators) {
		if(input[validatorName]) {
			let valid = validators[validatorName](value, input[validatorName]);
			errors[validatorName] = !valid;
		}
	};

	return { type: ERROR, formName, input, name, value: errors };
};

export const syncValidateForm = ({ formName, form, submit }) => {
	return dispatch => {
		for(let name in form.inputs) {
			let input = form.inputs[name];
			dispatch({ type: BLUR, formName, name });
			dispatch(syncValidateInput({ formName, input, name: input.name, value: input.value, submit }));
		}
	};
};