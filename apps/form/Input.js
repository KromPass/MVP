import style from './input.scss';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getContext } from 'recompose';

import { TextField, TextFieldInput, SelectField, MenuItem, Checkbox, RadioButtonGroup, Toggle, IconButton } from 'material-ui';
import icons from '../helpers/icons';
import { pushInput, editInput, change, blur } from './form.actions.js';

const connectWithFormName = (...args) => {
	return compose(
    	getContext({ formName: PropTypes.string.isRequired }),
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
		formName: PropTypes.string.isRequired,
	}

	constructor(props, context) {
		super(props, context);
		this.context = context;
	}

	componentWillMount() {
		const input = _.pick(this.props, [
            'name', 'type', 'required', 'predefined',
            'minLength', 'maxLength', 'pattern',
            'min', 'max', 'step',
            'values',
            'readonly'
        ]);
		this.props.dispatch(pushInput({ formName: this.context.formName, input, name: this.props.name }));
  	}

	@autobind
	change(event, value, selectValue) {
		const input = this.props.input;
        const newValue = selectValue || value;
		this.props.dispatch(change({ formName: this.context.formName, input, name: this.props.name, value: newValue }));
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

        console.log(type);

		let properties = {
			id: input.name,
			name: input.name,
			type,
			floatingLabelText: _.startCase(input.name),
			floatingLabelFixed: true,
			value: input.value || '',
			disabled: input.readonly,
			minLength: input.minLength,
            maxLength: input.maxLength,

            min: input.min,
            max: input.max,
            step: input.step,

			onBlur: this.blur,
			onChange: this.change,

			errorText: input.errorText,
			errorStyle: { whiteSpace: 'pre' },
		};

        let element;

        if(input.type == 'password') {
            element = (
                <div className={style['input-container']}>
                    <TextField {...properties} className="input" />
                    <IconButton className={style['input-button']} onTouchTap={this.toggleVisibility} iconStyle={{ color: 'grey' }}>
                        { input.visibility ? <icons.visibilityOff /> : <icons.visibility />}
                    </IconButton>
                </div>
            );
        }
        else if(input.values) {
            element = (
                <div className={style['input-container']}>
                    <SelectField {...properties} value={input.value}>
                        { input.values.map(value => (<MenuItem key={value} value={value} primaryText={value} />)) }
                    </SelectField>
                </div>
            );
        }
        else {
            element = (
                <div className={style['input-container']}>
                    <TextField {...properties} className="input" />
                </div>
            );
        }

		return element;
	}
}