import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { clean, initForm, submitForm } from './form.actions.js';

@connect((state, props) => ({
	formName: props.formName,
	form: state.forms[props.formName],
}))
export default class Form extends React.Component {
	static childContextTypes = {
		formName: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
	}

	getChildContext() {
		return {
			formName: this.props.formName,
		};
	}

	componentWillMount() {
		this.props.dispatch(initForm({ formName: this.props.formName }));
	}

	componentWillUnmount() {
		// this.props.dispatch(clean());
	}

	@autobind
	submit(event) {
		event.preventDefault();
		this.props.dispatch(submitForm({ formName: this.props.formName, form: this.props.form, submit: this.props.onSubmit }));
	}

	render() {
		return (
			<form name={this.props.formName} onSubmit={this.submit}>
				{ this.props.children }
				<pre>{JSON.stringify(this.props.form, null, 4)}</pre>
			</form>
		);
	}
};