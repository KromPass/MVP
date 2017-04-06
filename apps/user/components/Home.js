import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Flex, Box } from 'reflexbox';
import { Paper, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, RaisedButton, FlatButton, CircularProgress } from 'material-ui';
import { authorize } from '../../helpers/authorize.js';

const avatar = require('../../img/avatar.jpg');

const placeholder = require('../../img/placeholder.jpg');

@authorize('user', '/auth')
@connect((state, props) => ({
	state,
}))
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Flex flexColumn p={2} justify="space-around" align="center">
				{ [0, 1].map(value =>
				<Box key={value} sm={12} md={9} lg={6} mb={3}>
					<Card>
					    <CardHeader title="John Doe" subtitle="Sales Manager" avatar={avatar} />
					    <CardMedia overlay={<CardTitle title="Lorem ipsum dolor sit amet" subtitle="Consectetur adipiscing elit" />}>
							<img src={placeholder} />
						</CardMedia>
					    {/* <CardTitle title="Time to Die Volume 2" subtitle="Just another leg day" /> */}
						<CardText>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
							Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
							Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
						</CardText>
						<CardActions style={{textAlign: "center"}}>
							<RaisedButton label="Reserve" />
							<RaisedButton label="Score" />
					    </CardActions>
					</Card>
				</Box>
				)}
			</Flex>
		);
	}
}