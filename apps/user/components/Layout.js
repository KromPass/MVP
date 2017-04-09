import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import styles from '../app.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Snackbar } from 'material-ui';

import { denotify } from '../../notification/notification.actions.js';
import TopBar from './TopBar';
import TabBar from './TabBar';
import BottomBar from './BottomBar';

let theme = getMuiTheme({
	fontFamily: 'Verdana',
	snackbar: { actionColor: '#fff' },
});

@connect((state, props) => ({
	auth: state.auth,
	notification: state.notification,
	navigation: state.navigation,
	routing: state.routing,
}))
export default class Layout extends React.Component {
	static childContextTypes = {
  		reflexbox: PropTypes.object
	}

	constructor(props) {
		super(props);
	}

	getChildContext() {
		let context = {
    		reflexbox: {
				breakpoints: {
					sm: '(min-width: 30em)',
					md: '(min-width: 48em)',
					lg: '(min-width: 60em)',
				},
			},
		};
		return context;
	}

	@autobind
	denotify() {
		this.props.dispatch(denotify());
	}

	render() {
		const { auth, notification, navigation } = this.props;
        // {this.props.location.action == 'POP' ? 'slide-right': 'slide-left'}

		const transitionName = 'from-left';
		const transition = {
			enter: styles[transitionName + '-enter'],
			enterActive: styles[transitionName + '-enter-active'],
			leave: styles[transitionName + '-leave'],
			leaveActive: styles[transitionName + '-leave-active'],
		};

		return (
			<MuiThemeProvider muiTheme={theme}>
			 	<div>
					{ auth.token && <TopBar /> }
					<ReactCSSTransitionGroup transitionName={transition} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
						<div key={location.pathname}>
							<TabBar />
							{this.props.children}
						</div>
					</ReactCSSTransitionGroup>
					{ auth.token && <BottomBar /> }
					<Snackbar bodyStyle={notification.style} open={notification.value ? true : false} message={notification.value} autoHideDuration={5000} onActionTouchTap={this.denotify} onRequestClose={this.denotify} action="X Close" />
				</div>
			</MuiThemeProvider>
		);
	}
};