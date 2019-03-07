import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import * as keys from '../../../keys';
import { Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
	registerGoogleService,
	fetchGoogleService,
	resetGoogleService
} from '../../../actions/google';
import AccountCard from './AccountCard';
import requireAuth from '../requireAuth';

import './css/SocialButton.css';

interface GoogleLoginProps {
	registerGoogleService: any;
	fetchGoogleService: any;
	resetGoogleService: any;
	googleService: boolean;
	username?: string;
}

class GoogleLoginButton extends Component<GoogleLoginProps> {
	state = { renderAccount: false };

	componentDidMount() {
		if (this.props.googleService) {
			this.props.fetchGoogleService();
		}
	}

	googleResponse = (response: any) => {
		this.props.registerGoogleService(response);
	};

	onError = (error: any) => {
		console.log(error);
	};

	renderAccount = () => {
		if (this.props.username && this.state.renderAccount) {
			return (
				<AccountCard
					username={this.props.username}
					resetFunction={this.props.resetGoogleService}
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
						<Card.Header>Google</Card.Header>
					</Card.Content>
					<Card.Content>
						<GoogleLogin
							clientId={keys.GOOGLE_CLIENT_ID}
							buttonText="Login"
							scope="https://www.googleapis.com/auth/drive profile email"
							render={(renderProps: any) => (
								<Button
									disabled={username ? true : false}
									color="google plus"
									icon="google"
									onClick={renderProps.onClick}
									size="massive"
								/>
							)}
							onSuccess={this.googleResponse}
							onFailure={this.onError}
						/>
					</Card.Content>
					{this.renderAccount()}
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	if (state.google) {
		return {
			username: state.google.name,
			googleService: state.user.googleService
		};
	}
	return {
		googleService: state.user.googleService
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			registerGoogleService,
			fetchGoogleService,
			resetGoogleService
		}
	)(GoogleLoginButton)
);
