import { browserHistory } from 'react-router';
import {
	LOADING, SUCCESS, FAILURE,
	SIGN_IN, SIGN_OUT,
	RECOVERING_PASSWORD, RECOVER_PASSWORD,
} from './auth.actions.js';

const defaultState = {
	loading: false,
	success: false,
	failure: false,
	identifier: '',
	password: '',
	token: null,
	user: null,
	group: null,
	recoveringPassword: false,
	recoverPassword: '',
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	let type = action.type;
	let payload = action.payload;
	let key = action.key;
	let value = action.value;

	switch(type) {
		case LOADING:
			state.loading = value;
			return state;
		case FAILURE:
			state.failure = value;
			return state;
		case SIGN_IN:
			state.token = value;
			return state;
		case SIGN_OUT:
			state.token = null;
			return state;
		case RECOVERING_PASSWORD:
			state.recoveringPassword = value;
			return state;
		default:
			return previousState;
	}
};

export default reducer;