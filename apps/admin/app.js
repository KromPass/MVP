import * as css from './app.scss';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { persistStore, autoRehydrate } from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';

import { history, store } from './store/store';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Auth from '../auth/Auth';
import Home from './components/Home';
import List from './components/List';
import Item from './components/Item';

injectTapEventPlugin();
export default class App extends React.Component {
	constructor() {
		super();
		this.state = { rehydrated: false };
	}

	componentWillMount() {
		let options = { whitelist: ['auth'] };
		const persistor = persistStore(store, options, () => this.setState({ rehydrated: true }));
		crosstabSync(persistor, options);
	}

	render() {
		if(!this.state.rehydrated)
			return null;

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Layout>
						<Switch>
                            <Route exact path="/" render={() => <Redirect to="/home" />} />
                            <Route exact path="/auth/:token?" component={Auth} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/list/:entity/:filter?" component={List} />
                            <Route exact path="/item/:entity/:id?" component={Item} />
                            <Route path="*" component={NotFound} />
						</Switch>
					</Layout>
				</ConnectedRouter>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));