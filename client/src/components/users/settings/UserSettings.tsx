import React, { Component } from 'react';
import {
	Header,
	Form,
	Image,
	Divider,
	Message,
	Input,
	Button
} from 'semantic-ui-react';
import faker from 'faker';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import requireAuth from '../../auth/requireAuth';
import { compose } from 'redux';
import EmailField from '../../auth/components/EmailField';
import UsernameField from '../../auth/components/UsernameField';
import { editUser } from '../../../actions';
import './css/UserSettings.css';

interface UserSettingsProps {
	username: string;
	handleSubmit: any;
	editUser: any;
}

export class UserSettings extends Component<UserSettingsProps> {
	state = { touched: false };

	onSubmit = (formProps: any) => {
		this.setState({ loading: true });
		this.props.editUser(formProps);
	};

	_renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			console.log('error:', meta.error);
			return <Message error content={meta.error} />;
		}
	};

	_renderEmail = (props: any) => {
		console.log(props.meta);
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
		if (this.state.touched) {
			return (
				<Button fluid positive>
					Edit
				</Button>
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				<Divider horizontal>
					<Header as="h4">Profile</Header>
				</Divider>
				<Image centered circular src={faker.image.avatar()} size="small" />
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
	if (state.auth.user) {
		return {
			initialValues: {
				email: state.auth.user.email,
				username: state.auth.user.username
			}
		};
	}
	return {};
};

const editProfileForm: any = compose(
	connect(
		mapStateToProps,
		{
			editUser
		}
	),
	reduxForm({ form: 'editProfile' })
)(UserSettings);

export default requireAuth(editProfileForm);
