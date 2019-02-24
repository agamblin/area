import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import * as keys from '../../../keys';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerGoogleService } from '../../../actions';

import './css/SocialButton.css';

interface GoogleLoginProps {
	registerGoogleService: any;
}

class GoogleLoginButton extends Component<GoogleLoginProps> {
	googleResponse = (response: any) => {
		this.props.registerGoogleService(response);
	};

	onError = (error: any) => {
		alert(error);
	};

	render() {
		return (
			<GoogleLogin
				clientId={keys.GOOGLE_CLIENT_ID}
				buttonText="Login"
				scope="https://www.googleapis.com/auth/drive profile email"
				render={(renderProps: any) => (
					<Button
						color="google plus"
						onClick={renderProps.onClick}
						className="social-button"
					>
						<Icon name="google plus g" />
					</Button>
				)}
				onSuccess={this.googleResponse}
				onFailure={this.onError}
			/>
		);
	}
}

export default connect(
	null,
	{
		registerGoogleService
	}
)(GoogleLoginButton);
