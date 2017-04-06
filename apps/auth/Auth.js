import config from '../../config/config';
import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import styles from '../helpers/helpers.scss';
import { Flex, Box, withReflex } from 'reflexbox';
import { Link } from 'react-router-dom';
import { Paper, Divider, CircularProgress, TextField, RaisedButton, Dialog } from 'material-ui';

import icons from '../helpers/icons';

import Form from '../form/Form.js';
import Input from '../form/Input.js';

import { user } from '../../models';
import { signIn, setToken, recoveringPassword, recoverPassword } from '../auth/auth.actions.js';

const logo = require('../img/logo.jpg')

@connect((state, props) => ({
	config: state.config,
	form: state.forms.auth,
	auth: state.auth,
}))
export default class Auth extends React.Component {
	constructor(props) {
		super(props);
        let token = this.props.match.params.token;
        if(token)
            this.props.dispatch(setToken({ token }));
	}

	@autobind
	submit(event) {
		this.props.dispatch(signIn({ email: this.props.form.values.email, password: this.props.form.values.password, successRedirect: this.props.auth.referer }));
	}

	@autobind
	recoveringPassword() {
		this.props.dispatch(recoveringPassword(true));
	}

	@autobind
	unrecoveringPassword() {
		this.props.dispatch(recoveringPassword(false));
	}

	@autobind
	recoverPassword() {
		this.props.dispatch(recoverPassword({ email: this.props.auth.email }));
	}

	render() {
		const recoverPasswordChildren = [
			<Input key="0" event={this.event} {...user.email} />
		];
		const recoverPasswordActions = [
			<RaisedButton key="0" type="button" label="Cancel" primary={true} onTouchTap={this.unrecoveringPassword} />,
			<RaisedButton key="1" type="button" label="Recover" disabled={!this.props.auth.email} primary={true} onTouchTap={this.recoverPassword} />,
		];

		return (
			<Flex sm={12} md={6} justify={'space-around'} align="center">
				<Box>
					<Paper>
						<Form formName={'auth'} onSubmit={this.submit}>
							<Flex flexColumn px={2} align={'center'} justify={'space-around'}>
								<Box mt={1}>
									<h1>{this.props.config.name}</h1>
								</Box>
								<Box>
									<Divider />
								</Box>
								<Box col={3}>
									<img styleName={'full-width'} src={logo} />
								</Box>
								<Box>
									<Input formName={'auth'} name={'email'} {...user.email} />
								</Box>
								<Box>
									<Input formName={'auth'} name={'password'} {...user.password} />
								</Box>
								<Box mt={2}>
									<RaisedButton type="submit" primary={true} label="Sign In" />
								</Box>
								<Box mt={1}>
									<small onTouchTap={this.recoveringPassword}>Forgot your password?</small>
								</Box>
								<Box mt={1}>
									<Divider style={{ width: '100%'}} />
								</Box>
								<Box mt={2} mb={2}>
                                    <a href={config.facebook.connectURL}>
                                        <icons.facebookBox color={'#3b5998'} style={{ width: '50px', height: '50px' }} />
                                    </a>
                                    <a href={config.google.connectURL}>
                                        <icons.googlePlusBox color={'#d34836'} style={{ width: '50px', height: '50px' }} />
                                    </a>
								</Box>
								{ this.props.loading &&
									<Box mt={2} mb={2}>
										<CircularProgress size={36} thickness={3} />
									</Box>
								}
							</Flex>
						</Form>
						<Dialog title="Recover Password" children={recoverPasswordChildren} actions={recoverPasswordActions} open={this.props.auth.recoveringPassword}></Dialog>
					</Paper>
				</Box>
			</Flex>
		);
	}
}