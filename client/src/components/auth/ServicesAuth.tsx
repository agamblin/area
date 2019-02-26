import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import GoogleLogin from './Services/GoogleLogin';
import GithubLogin from './Services/GithubLogin';
import TrelloLogin from './Services/TrelloLogin';

export class ServicesAuth extends Component {
	render() {
		return (
			<Grid columns={3} centered>
				<Grid.Row>
					<Grid.Column width={4} textAlign="center">
						<GoogleLogin />
					</Grid.Column>
					<Grid.Column width={4} textAlign="center">
						<GithubLogin />
					</Grid.Column>
					<Grid.Column width={4} textAlign="center">
						<TrelloLogin />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ServicesAuth;
