import * as css from './app.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import getApp from '../helpers/getApp';

import * as reducers from './store/reducers';
import router, { history } from './router';
const persistWhitelist = ['auth'];

const App = getApp({ reducers, router, history, persistWhitelist });

ReactDOM.render(<App />, document.getElementById('app'));