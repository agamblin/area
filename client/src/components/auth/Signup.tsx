import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import { compose } from 'redux';
import EmailField from './components/EmailField';
import PasswordField from './components/PasswordField';
import UsernameField from './components/UsernameField';
import {
	Form,
	Button,
	Message,
	Segment,
	Header,
	Icon,
	Input
} from 'semantic-ui-react';
import './css/Signup.css';
import { reduxForm, Field } from 'redux-form';

class Signup extends React.Component<any> {
	state = { loading: false };

	onSubmit = (formProps: any) => {
		this.setState({ loading: true });
		this.props.signUp(formProps);
	};

	_renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			return <Message error content={meta.error} />;
		}
	};

	_renderPassword = (props: any) => {
		return <PasswordField {...props} _renderErrors={this._renderErrors} />;
	};

	_renderMail = (props: any) => {
		return <EmailField {...props} _renderErrors={this._renderErrors} />;
	};

	_renderUsername = (props: any) => {
		return <UsernameField {...props} _renderErrors={this._renderErrors} />;
	};

	_displayErrorMsg = () => {
		if (this.props.errorMsg) {
			return <Message error content={this.props.errorMsg} />;
		}
	};

	render() {
		return (
			<Segment raised padded="very">
				<Header as="h2" icon textAlign="center" size="medium">
					<Icon name="add user" circular />
					<Header.Content>Register</Header.Content>
				</Header>
				<Form
					error
					loading={this.state.loading && !this.props.errorMsg ? true : false}
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					{this._displayErrorMsg()}
					<Segment padded="very" attached className="grey-segment">
						<Form.Group widths="equal">
							<Field name="email" label="Email" component={this._renderMail} />
							<Field
								name="username"
								label="Username"
								component={this._renderUsername}
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<Field
								name="password"
								label="Password"
								component={this._renderPassword}
							/>
							<Field
								name="confirm_password"
								label="Confirm password"
								component={this._renderPassword}
							/>
						</Form.Group>
					</Segment>
					<Button.Group attached="bottom" fluid>
						<Button onClick={() => history.back()}>Cancel</Button>
						<Button.Or />
						<Button positive type="submit">
							Sign up
						</Button>
					</Button.Group>
				</Form>
			</Segment>
		);
	}
}

const validate = (formValues: any) => {
	const errors = {} as any;

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}
	if (formValues.password) {
		if (formValues.password.length < 5) {
			errors.password = 'Password needs to be at a minimum 5 characters';
		}
	} else {
		errors.password = 'You must enter a password';
	}
	if (formValues.password !== formValues.confirm_password) {
		errors.confirm_password = 'Password does not match';
	}
	if (!formValues.username) {
		errors.username = 'You must enter a username';
	}
	return errors;
};

const mapStateToProps = (state: any) => {
	return {
		errorMsg: state.auth.errorMessage
	};
};

const signupForm: any = compose(
	connect(
		mapStateToProps,
		{
			signUp
		}
	),
	reduxForm({ form: 'signup', validate: validate })
)(Signup);

export default signupForm;
