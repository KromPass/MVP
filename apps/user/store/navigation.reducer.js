import _ from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import { POP, SET_MENU, CLEAN_TABS, SET_TABS, SET_TAB } from './navigation.actions';

const defaultState = {
	previousLocation: null,
	previousPathname: null,
	currentLocation: null,
	currentPathname: null,
	history: [],
	tabs: null,
	tab: null,
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	let { type, payload, key, value } = action;

	switch(type) {
		case LOCATION_CHANGE:
			const previousLocation = _.last(state.history);
			const previousPathname = previousLocation ? previousLocation.pathname : null;

			const currentLocation = payload;
			const currentPathname = payload.pathname;

			state.history.push(currentLocation);
			state.previousLocation = previousLocation;
			state.previousPathname = previousPathname;
			state.currentLocation = currentLocation;
			state.currentPathname = currentPathname;

			return state;
		case SET_MENU:
			state.menu = value;
			return state;
		case CLEAN_TABS:
			state.tabs = state.tab = null;
			return state;
		case SET_TABS:
			state.tabs = value;
			state.tab = 0;
			return state;
		case SET_TAB:
			state.tab = value;
			return state;
		default:
			return previousState;
	}
};

export default reducer;