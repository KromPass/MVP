import React from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Auth from '../auth/Auth';
import Home from './components/Home';
import List from './components/List';
import Item from './components/Item';

export const history = createHistory({ basename: '/admin' });

export default class Router extends React.Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/auth/:token?" component={Auth} />
                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/list/:entity/:filter?" component={List} />
                        <Route exact path="/item/:entity/:id?" component={Item} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        );
    }
}