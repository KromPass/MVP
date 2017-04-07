import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { AppBar, BottomNavigation, BottomNavigationItem, Paper, Tabs, Tab, IconButton, Avatar, FontIcon, Snackbar } from 'material-ui';
import IconBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSchedule from 'material-ui/svg-icons/action/today';
import IconScore from 'material-ui/svg-icons/editor/format-list-numbered';
import IconResults from 'material-ui/svg-icons/action/trending-up';
import IconNews from 'material-ui/svg-icons/social/whatshot';
import IconProfile from 'material-ui/svg-icons/social/person';
import { push, setMenu } from '../reducers/navigation.actions.js';

@connect((state, props) => ({
	navigation: state.navigation,
}))
export default class BottomBar extends React.Component {
	componentWillMount() {
		this.props.dispatch(setMenu('Home'));
	}

	@autobind
	select(entry) {
		this.props.dispatch(setMenu(entry.label));
		this.props.dispatch(push(entry.location));
	}

	render() {
		const menu = this.props.navigation.menu;

		const entries = [{
			label: 'Home', icon: <IconHome />, location: '/home',
		},{
			label: 'Schedule', icon: <IconSchedule />, location: '/calendar',
		},{
			label: 'Scores', icon: <IconScore />, location: '/scores',
		},{
			label: 'Results', icon: <IconResults />, location: '/results',
		},{
			label: 'Events', icon: <IconNews />, location: '/events',
		}];

		let menuIndex = 0;
		_.forEach(entries, (entry, index) => {
			if(entry.label == menu)
				menuIndex = index;
		});

		return (
			<Paper zDepth={1} styleName='bottom-bar'>
				<BottomNavigation selectedIndex={menuIndex}>
					{ _.map(entries, (entry, key) => (
						<BottomNavigationItem key={key} label={entry.label} icon={entry.icon} onTouchTap={ () => this.select(entry) } />
					)) }
				</BottomNavigation>
			</Paper>
		);
	}
}