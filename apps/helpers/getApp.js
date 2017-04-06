import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';

import getStore from './getStore';

injectTapEventPlugin();

const createApp = ({ reducers, history, router: Router, persistWhitelist }) => {
    const store = getStore({ reducers, history });

    class App extends React.Component {
    	constructor() {
    		super();
    		this.state = { rehydrated: false };
    	}

    	componentWillMount() {
    		const options = { whitelist: persistWhitelist };
    		const persistor = persistStore(store, options, () => this.setState({ rehydrated: true }));
    		crosstabSync(persistor, options);
    	}

    	render() {
    		if(!this.state.rehydrated)
    			return null;

    		return (
    			<Provider store={store}>
                    <Router />
                </Provider>
    		);
    	}
    };

    return App;
};

export default createApp;