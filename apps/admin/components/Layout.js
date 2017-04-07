import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import styles from '../app.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Flex, Box } from 'reflexbox';
import { Snackbar } from 'material-ui';
import { TopBar, Navigation }  from './';

import { denotify } from '../../notification/notification.actions';

let theme = getMuiTheme({
	fontFamily: 'Verdana',
	snackbar: { actionColor: '#fff' },
});

@connect((state, props) => ({
    auth: state.auth,
	notification: state.notification,
	state: state,
}))
export default class Layout extends React.Component {
	static childContextTypes = {
  		reflexbox: React.PropTypes.object
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

        const denotify = () => this.props.dispatch(denotify());

		return (
			<MuiThemeProvider muiTheme={theme}>
				<Flex>
					{ this.props.auth.token &&
						<Box sm={4} md={3}>
							<Navigation />
						</Box>
					}
                    <Box sm={8} md={9}>
                        <Flex flexColumn>
                            <Box>
                                { this.props.auth.token && <TopBar /> }
                            </Box>
                            <Box p={2}>
                                {this.props.children}
                            </Box>
                        </Flex>
                    </Box>
                    <Snackbar bodyStyle={this.props.notification.style} open={this.props.notification.value ? true : false} message={this.props.notification.value} autoHideDuration={5000} onActionTouchTap={denotify} onRequestClose={denotify} action="X Close" />
				</Flex>
			</MuiThemeProvider>
		);
	}
};