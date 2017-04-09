import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import { REHYDRATE } from 'redux-persist/constants';
import { persistStore, autoRehydrate } from 'redux-persist';
import createActionBuffer from 'redux-action-buffer';

import config from '../../config/config.js';
import auth from '../auth/auth.reducer.js';
import notification from '../notification/notification.reducer.js';
import forms from '../form/form.reducer.js';

const defaultReducers = { config: () => config, auth, notification, forms, routing: routerReducer };

const getStore = ({ reducers, history }) => {
    reducers = { ...defaultReducers, ...reducers };
    const finalReducer = combineReducers(reducers);
    const historyMiddleware = routerMiddleware(history);
    const loggerMiddleware = createLogger();
    const finalMiddleware = applyMiddleware(
    	thunkMiddleware,
    	promiseMiddleware,
    	historyMiddleware,
        loggerMiddleware,
    	createActionBuffer(REHYDRATE),
    );
    return createStore(finalReducer, composeWithDevTools(finalMiddleware, autoRehydrate({ log: false })));
};
export default getStore;