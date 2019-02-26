import React, { Component } from 'react';
import * as qs from 'querystring';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import requireAuth from '../../auth/requireAuth';
import * as keys from '../../../keys';
import {
	fetchGithubService,
	resetGithubService
} from '../../../actions/github';

import './css/SocialButton.css';

interface GithubLoginProps {
	userId: number;
	username?: string;
	fetchGithubService: any;
	resetGithubService: any;
}

export class GithubLogin extends Component<GithubLoginProps> {
	componentDidMount() {
		this.props.fetchGithubService();
	}

	_renderAccount = () => {
		if (this.props.username) {
			return (
				<Card.Content extra className="social-card">
					Connected as: {this.props.username}
					<p className="reset-link" onClick={this.props.resetGithubService}>
						reset
					</p>
				</Card.Content>
			);
		}
	};

	render() {
		const { username } = this.props;
		return (
			<Card>
				<Card.Content>
					<Card.Header>Github</Card.Header>
				</Card.Content>
				<Card.Content>
					<Button
						disabled={username ? true : false}
						as="a"
						href={
							'https://github.com/login/oauth/authorize?' +
							qs.stringify({
								client_id: keys.GITHUB_CLIENT_ID,
								client_secret: keys.GITHUB_SECRET,
								scope: 'user repo',
								state: this.props.userId
							})
						}
						color="black"
						size="massive"
						icon="github"
					/>
				</Card.Content>
				{this._renderAccount()}
			</Card>
		);
	}
}

const mapStateToProps = (state: any) => {
	if (state.user && state.github.name) {
		return {
			userId: state.user.id,
			username: state.github.name
		};
	} else if (state.user) {
		return {
			userId: state.user.id
		};
	}
	return {};
};
export default requireAuth(
	connect(
		mapStateToProps,
		{
			fetchGithubService,
			resetGithubService
		}
	)(GithubLogin)
);
