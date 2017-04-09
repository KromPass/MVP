import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Flex, Box } from 'reflexbox';

import { Paper, IconMenu, MenuItem, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import icons from '../../helpers/icons'
// import ActionListIcon from 'material-ui/svg-icons/more-vert';
// import EditIcon from 'material-ui/svg-icons/edit';
// import RemoveIcon from 'material-ui/svg-icons/delete';

import { authorize } from '../../helpers/authorize.js';

import { clean, setEntity, get, add, edit, remove } from '../reducers/list.actions.js';

const mapStateToProps = (state, props) => ({
	list: state.list,
	entity: props.params.entity,
});

@authorize('admin', '/auth')
@connect(mapStateToProps)
export default class List extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.dispatch(setEntity({ entity: this.props.entity }));
		this.props.dispatch(get({ entity: this.props.entity }));
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.entity == nextProps.entity)
			return;
		this.props.dispatch(clean());
		this.props.dispatch(setEntity({ entity: this.props.entity }));
		this.props.dispatch(get({ entity: this.props.entity }));
	}

	componentWillUnmount() {
		this.props.dispatch(clean());
	}

	render() {
		const entity = this.props.list.entity;
		const attributes = this.props.list.attributes;
		const items = this.props.list.success;

		const listAttributes = _.pickBy(attributes, attribute => !attribute.hideOnList);
		delete listAttributes.ins;
		delete listAttributes.outs;

		let header = _.map(listAttributes, (value, key) => {
			return <TableHeaderColumn key={key}>{_.startCase(value.name)}</TableHeaderColumn>
		});
		header.push(<TableHeaderColumn key={'0-actions'}>{'actions'}</TableHeaderColumn>);

		header = <TableRow>{header}</TableRow>;

		let actionButtonOrigin = { vertical: 'top', horizontal: 'middle' };

		let rows = _.map(items, (item, itemKey) => {
			let row = (
				<TableRow key={itemKey} displayBorder={true}>
					{
						_.map(listAttributes, (attribute, attributeKey) => {
							return <TableRowColumn key={attributeKey}>{item[attribute.name]}</TableRowColumn>
						})
					}
					<TableRowColumn key={itemKey + '-actions'}>
						<IconMenu iconButtonElement={<IconButton><ActionListIcon /></IconButton>} anchorOrigin={actionButtonOrigin} targetOrigin={actionButtonOrigin}>
							<MenuItem primaryText="Edit" containerElement={<Link to={`/item/user/${item.id}`} />} rightIcon={<EditIcon />} />
							<MenuItem primaryText="Remove" rightIcon={<RemoveIcon />} />
						</IconMenu>
					</TableRowColumn>
				</TableRow>
			);
			return row;
		});

		return (
			<Paper>
				<Table multiSelectable={true} >
					<TableHeader>{header}</TableHeader>
					<TableBody>{rows}</TableBody>
				</Table>
			</Paper>
		);
	}
};