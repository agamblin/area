import React, { Component } from 'react';
import {
	Header,
	Form,
	Divider,
	Message,
	Button,
	Loader,
	Dimmer
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import { compose } from 'redux';
import EmailField from '../auth/components/EmailField';
import UsernameField from '../auth/components/UsernameField';
import ImageProfile from './ImageProfile';
import { editUser, fetchUser } from '../../actions/user';
import './css/UserSettings.css';

interface UserSettingsProps {
	username: string;
	handleSubmit: any;
	editUser: any;
	fetchUser: any;
}

export class UserSettings extends Component<UserSettingsProps> {
	state = { touched: false, file: null, loading: false };

	componentDidMount() {
		this.props.fetchUser();
	}

	onSubmit = async (formProps: any) => {
		this.setState({ loading: true });
		await this.props.editUser(formProps, this.state.file);
		this.setState({ loading: false });
	};

	_renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			return <Message error content={meta.error} />;
		}
	};

	_renderEmail = (props: any) => {
		if (props.meta.active) {
			this.setState({ touched: true });
		}
		return <EmailField {...props} _renderErrors={this._renderErrors} />;
	};

	_renderUsername = (props: any) => {
		if (props.meta.active) {
			this.setState({ touched: true });
		}
		return <UsernameField {...props} _renderErrors={this._renderErrors} />;
	};

	_renderSubmitButton = () => {
		if (this.state.touched || this.state.file) {
			return (
				<Button fluid positive>
					Edit
				</Button>
			);
		}
	};

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

	_renderLoader = () => {
		if (this.state.loading) {
			return (
				<Dimmer active inverted>
					<Loader size="medium">Loading</Loader>
				</Dimmer>
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				<Divider horizontal>
					<Header as="h4">Profile</Header>
				</Divider>
				{this._renderImage()}
				{this._renderLoader()}
				<Form
					className="edit-form"
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Field name="email" component={this._renderEmail} />
					<Field name="username" component={this._renderUsername} />
					{this._renderSubmitButton()}
				</Form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => {
	if (state.user.email) {
		return {
			initialValues: {
				email: state.user.email,
				username: state.user.username
			}
		};
	}
	return {};
};

const editProfileForm: any = compose(
	connect(
		mapStateToProps,
		{
			editUser,
			fetchUser
		}
	),
	reduxForm({ form: 'editProfile' })
)(UserSettings);

export default requireAuth(editProfileForm);
