import { CLEAN, LOADING, SUCCESS, FAILURE, ENTITY, ATTRIBUTES } from './list.actions.js';

const defaultState = {
	loading: null,
	success: null,
	failure: null,
	entity: null,
	attributes: null,
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	const { type, payload, key, value } = action;

	switch(type) {
		case LOADING:
			state.loading = value;
			return state;
		case SUCCESS:
			state.success = value;
			state.failure = null;
			return state;
		case FAILURE:
			state.success = null;
			state.failure = value;
			return state;
		case ENTITY:
			state.entity = value;
			return state;
		case ATTRIBUTES:
			state.attributes = value;
			return state;
		case CLEAN:
			return _.cloneDeep(defaultState);
		default:
			return previousState;
	}
};

export default reducer;