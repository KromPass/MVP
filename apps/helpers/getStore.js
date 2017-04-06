import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import { REHYDRATE } from 'redux-persist/constants';
import { persistStore, autoRehydrate } from 'redux-persist';
import createActionBuffer from 'redux-action-buffer';

const getStore = ({ reducers, history }) => {
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