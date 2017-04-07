import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { authorize } from '../../helpers/authorize.js';

@authorize('admin', '/auth')
@connect((state, props) => ({
	state,
}))
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <h1>home</h1>;
	}
}