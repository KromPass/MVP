import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

import IconHome from 'material-ui/svg-icons/social/whatshot';

export default class ScoreList extends React.Component {
	constructor(props) {
		super(props);
  	}

	render() {
		return (
			<ul>
				<li>ciao</li>
				<li>bello</li>
			</ul>
		);
	}
}