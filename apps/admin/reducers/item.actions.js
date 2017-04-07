import axios from 'axios';
import { push } from 'react-router-redux';
import { initForm } from '../../form/form.actions.js';
import { notifySuccess, notifyWarning, notifyFailure } from '../../notification/notification.actions.js'

import entities from '../../../models';

export const CLEAN = 'CLEAN';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const ENTITY = 'ENTITY';
export const ATTRIBUTES = 'ATTRIBUTES';

export const clean = () => ({ type: CLEAN });

export const setEntity = ({ entity, id }) => {
	let attributes = entities[entity];
	attributes = _.omit(attributes, ['ins', 'outs']);

	if(!id)
		attributes = _.pickBy(attributes, attribute => !attribute.hideOnAdd);

	return (dispatch) => {
		dispatch({ type: ENTITY, entity });
		dispatch({ type: ATTRIBUTES, value: attributes });
		if(id) {
			dispatch(get({ entity, id }));
		}
	};
};

export const get = async ({ entity, id }) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, value: true });

		try {
			let result = await axios.post('/p/api/get', { entity, id });
			dispatch({ type: SUCCESS, value: result.data });
			dispatch(initForm({ formName: 'item', values: result.data }));
		}
		catch(error) {
			dispatch({ type: FAILURE, value: error.response.data });
			dispatch(notifyFailure(error.response.data));
		}
		finally {
			dispatch({ type: LOADING, value: false });
		}
	};
};

export const add = async ({ entity, properties }) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, value: true });

		try {
			let result = await axios.post('/p/api/add', { entity, properties });
			dispatch({ type: SUCCESS, value: result.data });
			dispatch(push(`/item/${entity}/${result.data.id}`));
		}
		catch(error) {
			dispatch({ type: FAILURE, value: error.response.data });
			dispatch(notifyFailure(error.response.data));
		}
		finally {
			dispatch({ type: LOADING, value: false });
		}
	};
};

export const edit = async () => {};
export const remove = async () => {};