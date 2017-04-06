import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { AppBar, IconButton, Avatar } from 'material-ui';
import IconBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import { push, pop } from '../store/navigation.actions.js';

const avatar = require('../../img/avatar.jpg');

@connect((state, props) => ({
	config: state.config,
	navigation: state.navigation,
}))
export default class TopBar extends React.Component {
	render() {
		let { config, navigation } = this.props;
		let showBack = (!navigation.currentPathname.includes('/home') && navigation.history.length > 1) || null;

		let props = {
			iconElementRight: <Avatar src={avatar} />,
			onLeftIconButtonTouchTap: () => this.props.dispatch(pop()),
		};

		if(showBack)
			props.iconElementLeft= <IconButton><IconBack /></IconButton>;
		else
			props.showMenuIconButton = false;

		return <AppBar styleName='top-bar' title={config.name} {...props} />;
	}
}