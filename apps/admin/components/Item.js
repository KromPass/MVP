import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { Flex, Box } from 'reflexbox';
import styles from '../../helpers/helpers.scss';

import { RaisedButton, CircularProgress } from 'material-ui';
import Form from '../../form/Form.js';
import Input from '../../form/Input.js';
import { clean, setEntity, get, add, edit, remove } from '../reducers/item.actions.js';
import { authorize } from '../../helpers/authorize.js';

const mapStateToProps = (state, props) => ({
	form: state.forms.item,
	item: state.item,
	entity: props.params.entity,
	id: props.params.id,
});

@authorize('admin', '/auth')
@connect(mapStateToProps)
export default class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.dispatch(setEntity({ entity: this.props.entity, id: this.props.id }));
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.id == nextProps.id)
			return;
		this.props.dispatch(setEntity({ entity: nextProps.entity, id: nextProps.id }));
	}

	componentWillUnmount() {
		this.props.dispatch(clean());
	}

	@autobind
	add() {
		const args = { entity: this.props.entity, properties: this.props.form.values };
		console.log('add', args);
		this.props.dispatch(add(args));
	}

	@autobind
	edit() {
		const args = { entity: this.props.item.entity, id: this.props.form.values.id, properties: this.props.form.values };
		console.log('edit', args);
		this.props.dispatch(edit(args));
	}

	@autobind
	remove() {
		const args = { entity: this.props.item.entity, id: this.props.form.values.id };
		console.log('remove', args);
		this.props.dispatch(remove(args));
	}

    render() {
		const adding = !this.props.id;

		let circularProgressAttributes = { size: 36, thickness: 3 };

        return (
			<Form formName={'item'} onSubmit={ adding ? this.add : this.edit }>
				{ this.props.form &&
					<Flex p={2} justify="space-around" wrap align="center">
					{
						_.map(this.props.item.attributes, (value, key) => (
							<Box key={key}>
								<Input {...value} />
							</Box>
						))
					}
					</Flex>
				}

				{ this.props.form &&
					<Flex p={2} justify="space-around" wrap align="center">
						{ !this.props.loading &&
							<Box>
								<RaisedButton type="button" secondary={true} label="Remove" onClick={this.remove} />
							</Box>
						}
						{ !this.props.loading &&
							<Box>
								<RaisedButton type="submit" primary={true} disabled={!this.props.form.valid} label={adding ? 'Add' : 'Edit'} />
							</Box>
						}
						{ this.props.loading &&
							<Box>
								<CircularProgress {...circularProgressAttributes} />
							</Box>
						}
					</Flex>
				}
			</Form>
		);
    }
};