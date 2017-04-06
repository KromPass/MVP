import _ from 'lodash';
import { SUCCESS, WARNING, FAILURE, DENOTIFY } from './notification.actions.js';
import { white, black, green700 as green, yellow700 as yellow, redA700 as red } from 'material-ui/styles/colors.js';

const json = value => JSON.stringify(value, null, 4);

const defaultState = {
	value: '',
	style: {},
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	let type = action.type;
	let value = action.value;
	value = _.isString(value) ? value : json(value);

	switch(type) {
		case SUCCESS:
			state.value = value;
			state.style = { backgroundColor: green, color: white };
			return state;
		case WARNING:
			state.value = value;
			state.style = { backgroundColor: yellow, color: black };
			return state;
		case FAILURE:
			state.value = value;
			state.style = { backgroundColor: red, color: white };
			return state;
		case DENOTIFY:
			state.value = '';
			state.style = {};
			return state;
		default:
			return previousState;
	}
};

export default reducer;