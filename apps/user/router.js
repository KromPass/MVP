import React from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Auth from '../auth/Auth';
import Home from './components/Home';
import Calendar from './components/Calendar';
import ScoreList from './components/ScoreList';
import ScoreItem from './components/ScoreItem';

export const history = createHistory({ basename: '/user' });

export default class Router extends React.Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                        <Route exact path="/auth/:token?" component={Auth} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/calendar" component={Calendar} />
                        <Route exact path="/scores" component={ScoreList} />
                        <Route exact path="/score" component={ScoreItem} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        );
    }
}