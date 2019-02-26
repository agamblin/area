import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import GoogleLogin from './Services/GoogleLogin';
import GithubLogin from './Services/GithubLogin';
import TrelloLogin from './Services/TrelloLogin';

export class ServicesAuth extends Component {
	render() {
		return (
			<div>
				<Grid columns={3} divided>
					<Grid.Row>
						<Grid.Column>
							<GoogleLogin />
						</Grid.Column>
						<Grid.Column>
							<GithubLogin />
						</Grid.Column>
						<Grid.Column>
							<TrelloLogin />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default ServicesAuth;
