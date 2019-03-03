import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import GoogleLogin from './Services/GoogleLogin';
import GithubLogin from './Services/GithubLogin';
import TrelloLogin from './Services/TrelloLogin';

export class ServicesAuth extends Component {
	render() {
		return (
			<React.Fragment>
				<Header
					as="h1"
					content="Services"
					subheader="Connect to Google, Trello and Github to power-up your productivity !"
					dividing
				/>
				<Grid columns={3} centered style={{ marginTop: '2.5%' }}>
					<Grid.Row>
						<Grid.Column width={4} textAlign="center">
							<GoogleLogin />
						</Grid.Column>
						<Grid.Column width={4} textAlign="center">
							<TrelloLogin />
						</Grid.Column>
						<Grid.Column width={4} textAlign="center">
							<GithubLogin />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

export default ServicesAuth;
