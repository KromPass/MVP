import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getContext } from 'recompose';

import { Checkbox, RadioButtonGroup, SelectField, TextField, TextFieldInput, Toggle, IconButton } from 'material-ui';
import icons from '../helpers/icons';
import { pushInput, editInput, change, blur } from './form.actions.js';

const connectWithFormName = (...args) => {
	return compose(
    	getContext({ formName: React.PropTypes.string.isRequired }),
    	connect(...args)
  	);
};

@connectWithFormName((state, props) => ({
	name: props.name,
	input: state.forms[props.formName] && state.forms[props.formName].inputs[props.name],
	formName: props.formName,
}))
export default class Input extends React.Component {
	static contextTypes = {
		formName: React.PropTypes.string.isRequired,
	}

	constructor(props, context) {
		super(props, context);
		this.context = context;
	}

	componentWillMount() {
		const input = _.pick(this.props, ['name', 'type', 'required', 'values', 'predefined', 'min', 'max', 'minLength', 'maxLength', 'pattern', 'readonly']);
		this.props.dispatch(pushInput({ formName: this.context.formName, input, name: this.props.name }));
  	}

	@autobind
	change(event, value) {
		const input = this.props.input;
		this.props.dispatch(change({ formName: this.context.formName, input, name: this.props.name, value }));
	}

	@autobind
	blur(event) {
		const input = this.props.input;
		this.props.dispatch(blur({ formName: this.context.formName, input, name: this.props.name }));
	}

	@autobind
	toggleVisibility() {
		let editedInput = { name: this.props.name, visibility: !this.props.input.visibility };
		this.props.dispatch(editInput({ formName: this.props.formName, input: editedInput, name: this.props.name }));
	}

	@autobind
	render() {
		const form = this.props.form;
		const input = this.props.input;

		if(!input)
			return null;

		let { type, visibility } = input;

		if(type == 'password' && visibility)
			type = 'text';

		let properties = {
			id: input.name,
			name: input.name,
			type,
			floatingLabelText: _.startCase(input.name),
			floatingLabelFixed: true,
			value: input.value || '',
			disabled: input.readonly,
			maxLength: input.max,
			minLength: input.min,

			onBlur: this.blur,
			onChange: this.change,

			errorText: input.errorText,
			errorStyle: { whiteSpace: 'pre' },
		};

		return (
			<div className="input-container">
				<TextField {...properties} className="input" />
				{ input.type == 'password' && (
					<IconButton className="input-button" onTouchTap={this.toggleVisibility} iconStyle={{ color: 'grey' }}>
						{ input.visibility ? <icons.visibilityOff /> : <icons.visibility />}
					</IconButton>
				)}
			</div>
		);
	}
}