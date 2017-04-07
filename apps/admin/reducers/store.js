import config from '../../../config/config.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import { REHYDRATE } from 'redux-persist/constants';
import { persistStore, autoRehydrate } from 'redux-persist';
import createActionBuffer from 'redux-action-buffer';

import authReducer from '../../auth/auth.reducer.js';
import notificationReducer from '../../notification/notification.reducer.js';
import formReducer from '../../form/form.reducer.js';

import navigationReducer from './navigation.reducer.js';
// import homeReducer from './home.reducer.js';
// import listReducer from './list.reducer.js';
// import itemReducer from './item.reducer.js';

const reducers = {
    config: () => config,
	auth: authReducer,
	navigation: navigationReducer,
	// home: homeReducer,
	// list: listReducer,
	// item: itemReducer,
	notification: notificationReducer,
	forms: formReducer,
	routing: routerReducer,
};
const finalReducer = combineReducers(reducers);

const loggerMiddleware = createLogger();

export const history = createHistory({ basename: '/admin' });
const historyMiddleware = routerMiddleware(history);

const finalMiddleware = applyMiddleware(
	thunkMiddleware,
	promiseMiddleware,
	loggerMiddleware,
	historyMiddleware,
	createActionBuffer(REHYDRATE),
);

export const store = createStore(finalReducer, composeWithDevTools(
	finalMiddleware,
	autoRehydrate({ log: false }),
));