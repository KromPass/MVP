import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Paper, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, MenuItem, Divider, IconMenu, IconButton } from 'material-ui';

import icons from '../../helpers/icons';

import { signOut } from '../../auth/auth.actions.js';

const mapStateToProps = (state, props) => ({
	loading: state.auth.loading,
	auth: state.auth,
	navigation: state.navigation,
	routing: state.routing,
});

@connect(mapStateToProps)
export default class TopBar extends React.Component {
	constructor(props) {
		super(props);
	}

	@autobind
	signOut() {
		this.props.dispatch(signOut());
	}

	render() {
		const actionButtonOrigin = { vertical: 'bottom', horizontal: 'left' };
		//const routePath = this.props.routing.locationBeforeTransitions.pathname;
		let routeName = 'LOC'; //routePath.replace('/admin/', '').replace(/\//g, ' > ');

		return (
				<Toolbar className="bottom-shadow">
			        <ToolbarGroup firstChild={true}>
						<MenuItem value={1} primaryText={routeName} />
					</ToolbarGroup>
					<ToolbarGroup lastChild={true}>
						<MenuItem value={1} primaryText="John Doe" />
						<IconMenu iconButtonElement={<IconButton><icons.expandMore /></IconButton>} anchorOrigin={actionButtonOrigin} targetOrigin={actionButtonOrigin}>
							<MenuItem primaryText="Profile" containerElement={<Link to={`/profile`} />} rightIcon={<icons.person />} />
							<Divider />
							<MenuItem primaryText="Sign Out" rightIcon={<icons.powerSettingsNew />} onTouchTap={this.signOut} />
						</IconMenu>
					</ToolbarGroup>
				</Toolbar>
		);
	}
}