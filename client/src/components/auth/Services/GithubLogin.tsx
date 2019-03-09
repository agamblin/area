import React, { Component } from 'react';
import * as qs from 'query-string';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import requireAuth from '../../auth/requireAuth';
import * as keys from '../../../keys';
import AccountCard from './AccountCard';
import {
	fetchGithubService,
	resetGithubService
} from '../../../actions/github';

import './css/SocialButton.css';
import globalState from '../../../types/states/globalState';

interface GithubLoginProps {
	userId?: number;
	username?: string;
	fetchGithubService: any;
	resetGithubService: any;
	githubService?: boolean;
}

export class GithubLogin extends Component<GithubLoginProps> {
	state = { renderAccount: false };

	componentDidMount() {
		if (this.props.githubService) {
			this.props.fetchGithubService();
		}
	}

	_renderAccount = () => {
		if (this.props.username && this.state.renderAccount) {
			return (
				<AccountCard
					username={this.props.username}
					resetFunction={this.props.resetGithubService}
				/>
			);
		}
	};

	render() {
		const { username } = this.props;
		
		return (
			<div
				onMouseEnter={() => this.setState({ renderAccount: true })}
				onMouseLeave={() => this.setState({ renderAccount: false })}
			>
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
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	if (state.user && state.github.name) {
		return {
			userId: state.user.id,
			username: state.github.name
		};
	} else if (state.user) {
		return {
			userId: state.user.id,
			githubService: state.user.githubService
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
