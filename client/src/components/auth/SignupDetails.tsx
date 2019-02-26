import React, { Component } from 'react';
import ImageProfile from '../users/ImageProfile';
import { Form, Divider, Header, Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { patchUser } from '../../actions/user';
import requireAuth from '../auth/requireAuth';
import ServicesAuth from './ServicesAuth';
import './css/SignupDetails.css';

interface SignupDetailsProps {
	patchUser: any;
}

export class SignupDetails extends Component<SignupDetailsProps> {
	state = { file: null, loading: false };

	_renderImage = () => {
		if (this.state.file) {
			return (
				<ImageProfile
					imageUrl={URL.createObjectURL(this.state.file)}
					onChange={(e: any) => this.setState({ file: e.target.files[0] })}
				/>
			);
		}
		return (
			<ImageProfile
				onChange={(e: any) => this.setState({ file: e.target.files[0] })}
			/>
		);
	};

	_handleSubmit = async () => {
		this.setState({ loading: true });
		await this.props.patchUser({ file: this.state.file });
		this.setState({ loading: false });
	};

	_renderButton = () => {
		if (this.state.file) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Button positive icon="check" size="large" circular type="submit" />
				</div>
			);
		}
	};

	_renderServices = () => {
		return <ServicesAuth />;
	};

	render() {
		return (
			<div>
				<Segment raised textAlign="center">
					<Header as="h1" textAlign="center">
						Give us some details
					</Header>
					<Form
						onSubmit={this._handleSubmit}
						loading={this.state.loading ? true : false}
					>
						<Divider horizontal>
							<Header as="h4">Image Profile</Header>
						</Divider>
						{this._renderImage()}
						<Divider horizontal>
							<Header as="h4">Services</Header>
						</Divider>
						{this._renderServices()}
						{this._renderButton()}
					</Form>
				</Segment>
			</div>
		);
	}
}

export default requireAuth(
	connect(
		null,
		{
			patchUser
		}
	)(SignupDetails)
);
