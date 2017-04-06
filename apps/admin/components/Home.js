import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { authorize } from '../../helpers/authorize.js';

const mapStateToProps = (state, props) => ({
	state,
});

@authorize('admin', '/auth')
@connect(mapStateToProps)
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return null;
	}
}