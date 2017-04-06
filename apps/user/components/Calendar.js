import styles from '../app.scss';
import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Flex, Box } from 'reflexbox';
import { Paper, List, ListItem, Subheader, Divider, IconButton, Badge, Avatar, IconMenu, MenuItem, RaisedButton } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import { black, transparent, pinkA200, grey400 } from 'material-ui/styles/colors';
import icons from '../../helpers/icons.js';

import { setTabs, setTab, cleanTabs } from '../store/navigation.actions.js';

const avatar = require('../../img/avatar.jpg');

@connect((state, props) => ({
	navigation: state.navigation,
}))
export default class Calendar extends React.Component {
	componentWillMount() {
		const tabs = 'CrossFit, CrossFit Kids, Weight Lifting, Competitor'.split(', ');
		this.props.dispatch(setTabs(tabs));
	}

	componentWillUnmount() {
		this.props.dispatch(cleanTabs());
	}

	render() {
		const days = ['Mon', 'Tue'];//, 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		const hours = ['9:00', '10:00', '11:00', '13:00'];

		const nestedItems = [0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(key => <ListItem key={key} primaryText="John Doe" leftAvatar={<Avatar src={avatar} />} />);

		const actionsIcon = (
			<IconButton touch={true} tooltip="Show actions" tooltipPosition="top-left">;
				<IconMore />
			</IconButton>
		);

		const actionsMenu = (
			<IconMenu iconButtonElement={actionsIcon} useLayerForClickAway={true}>
				<MenuItem>View</MenuItem>
				<MenuItem>Edit</MenuItem>
				<MenuItem>Remove</MenuItem>
			</IconMenu>
		);

		const items = [];
		for(let time of hours) {
			items.push(<Divider key={`divider-${time}`} />);
			items.push(<ListItem key={`item-${time}`}
				primaryText={`${time} - Riccardo Romano`} secondaryText={'5/15'}
				leftAvatar={<Avatar src={avatar} />}
				nestedItems={nestedItems}
			>
				<IconMenu iconButtonElement={actionsIcon} useLayerForClickAway={true} styleName={style['list-item-additional-right-icon-menu']}>
					<MenuItem>View</MenuItem>
					<MenuItem>Edit</MenuItem>
					<MenuItem>Remove</MenuItem>
				</IconMenu>
			</ListItem>);
		}

		return (
			<SwipeableViews>
				{ days.map(day => (
				<Flex key={day} flexColumn p={2} justify="space-around" align="center">
					<Box sm={12} md={9} lg={6} mb={3} styleName={styles['full-width']}>
						<Paper zDepth={1}>
						    <List>
								<Subheader style={{ textAlign: 'center', fontWeight: 'bold' }}>{day} 18</Subheader>
								{items}
						    </List>
						</Paper>
					</Box>
				</Flex>
				))}
			</SwipeableViews>
		);
	}
}