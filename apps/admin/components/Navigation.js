import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, AppBar, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, List, ListItem, MenuItem, IconButton, Divider, Subheader, AutoComplete } from 'material-ui';

import icons from '../../helpers/icons';

// import IconPeople from 'material-ui/svg-icons/people';
// import IconAdd from 'material-ui/svg-icons/add';
// import IconSettings from 'material-ui/svg-icons/settings';
// import IconEvent from 'material-ui/svg-icons/event';
// import IconWatch from 'material-ui/svg-icons/watch-later';
// import IconFitness from 'material-ui/svg-icons/fitness-center';
// import IconEdit from 'material-ui/svg-icons/mode-edit';

import { signOut } from '../../auth/auth.actions.js';

@connect((state, props) => ({
    loading: state.auth.loading,
	navigation: state.navigation,
}))
export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let linkGenerator = ({ entity, filters, list = true }) => {
			let result = `/${list ? 'list' : 'item'}/${entity}`;
			if(filters) {
				result += '?';
				_.each(filters, (value, key) => result += `${key}=${value}&`);
				result = result.slice(0, -1);
			}
			return result;
		};

		let entryGenerator = entry => {
            const Icon = icons[entry.icon];
			return (
				<ListItem
					key={entry.name}
					primaryText={_.capitalize(entry.name)}
					leftIcon={Icon && <Icon />}
					containerElement={<Link to={linkGenerator(entry)} />}
					primaryTogglesNestedList={true}
					nestedItems={entry.children ? entry.children.map(entryGenerator) : []}
					//rightIconButton={<IconButton children={<IconAdd />} containerElement={<Link to="/admin/item/user" />} />}
				/>
			);
		};

		const menuEntries = this.props.navigation.menuEntries.map(entryGenerator);
		const configurationEntries = this.props.navigation.configurationEntries.map(entryGenerator);

		return (
			<Paper zDepth={1}>
				<Toolbar className="bottom-shadow">
					<ToolbarGroup firstChild={true}>
						<MenuItem value={1} primaryText="MVP" />
					</ToolbarGroup>
				</Toolbar>
				<List>
					<Subheader>Menu</Subheader>
					{menuEntries}
					<Divider />
					<Subheader>Configure</Subheader>
					{configurationEntries}
				</List>
			</Paper>
		);
	}
};
//
// <ListItem
// 	primaryText="Users"
// 	value={'users'}
// 	leftIcon={<IconPeople />} containerElement={<Link to="/admin/list/user" />}
// 	rightIconButton={<IconButton children={<IconAdd />} containerElement={<Link to="/admin/item/user" />} />}
// />
//
// <ListItem
// 	primaryText="Classes"
// 	value={'classes'}
// 	leftIcon={<IconWatch />} containerElement={<Link to="/admin/list/class" />}
// 	primaryTogglesNestedList={true}
// 	nestedItems={
// 		_.map(this.state.disciplines, (value, key) => <ListItem key={key} primaryText={value} leftIcon={<IconFitness />} />)
// 	}
// />
//
// <ListItem primaryText="Events"
// 	leftIcon={<IconEvent />}
// />
//
// <ListItem primaryText="Articles"
// 	leftIcon={<IconEdit />}
// />

//####
// <Subheader>Configure</Subheader>
// <ListItem primaryText="Disciplines" leftIcon={<IconFitness />} />
// <ListItem primaryText="Classes" leftIcon={<IconWatch />} primaryTogglesNestedList={true} nestedItems={
// 	_.map(this.state.disciplines, (value, key) => <ListItem key={key} primaryText={value} leftIcon={<IconFitness />} />)
// } />
// <ListItem primaryText="Settings" leftIcon={<IconSettings />} />
// <Divider />
//
