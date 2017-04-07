import { push as routerPush, goBack } from 'react-router-redux';

export const POP = 'NAVIGATION_POP';
export const SET_MENU = 'NAVIGATION_SET_MENU';
export const CLEAN_TABS = 'NAVIGATION_CLEAN_TABS';
export const SET_TABS = 'NAVIGATION_SET_TABS';
export const SET_TAB = 'NAVIGATION_SET_TAB';

export const push = (location) => {
	return routerPush(location);
};

export const pop = () => {
	return goBack();
};

export const setMenu = (value) => {
	return { type: SET_MENU, value };
};

export const cleanTabs = () => {
	return { type: CLEAN_TABS };
};

export const setTabs = (value) => {
	return { type: SET_TABS, value };
};

export const setTab = (value) => {
	return { type: SET_TAB, value };
};