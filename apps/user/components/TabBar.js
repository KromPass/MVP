import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Paper, Tabs, Tab } from 'material-ui';
import { setTab } from '../reducers/navigation.actions.js';

@connect((state, props) => ({
	navigation: state.navigation,
}))
export default class TabBar extends React.Component {
	render() {
		const { tabs, tab } = this.props.navigation;

		if(!tabs)
			return null;

		return (
			<Paper zDepth={1}>
				<Tabs value={this.props.navigation.tab} onChange={value => this.props.dispatch(setTab(value)) }>
					{ _.map(tabs, (value, key) => (<Tab key={key} value={key} label={value} />))}
				</Tabs>
			</Paper>
		);
	}
}