import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions';
import { compose } from 'redux';
import {
	Form,
	Button,
	Message,
	Segment,
	Header,
	Icon,
	Input
} from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';

const Signup = (props: any) => {
	const [loading, setLoading] = useState(false);

	const onSubmit = (formProps: any) => {
		setLoading(true);
		props.signUp(formProps);
	};

	const _renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			console.log('error:', meta.error);
			return <Message error content={meta.error} />;
		}
	};

	const _renderPassword = (props: any) => {
		return (
			<Form.Field>
				<Input
					{...props}
					placeholder={props.label}
					label={null}
					icon="lock"
					iconPosition="left"
				/>
				{_renderErrors(props.meta)}
			</Form.Field>
		);
	};

	const _renderMail = (props: any) => {
		return (
			<Form.Field>
				<Input
					{...props}
					icon="mail"
					iconPosition="left"
					placeholder={props.label}
					label={null}
				/>
				{_renderErrors(props.meta)}
			</Form.Field>
		);
	};

	const _renderUsername = (props: any) => {
		return (
			<Form.Field>
				<Input
					{...props}
					icon="user"
					iconPosition="left"
					placeholder={props.label}
					label={null}
				/>
				{_renderErrors(props.meta)}
			</Form.Field>
		);
	};

	const _displayErrorMsg = () => {
		if (props.errorMsg) {
			return <Message error content={props.errorMsg} />;
		}
	};

	return (
		<Segment raised padded="very">
			<Header as="h2" icon textAlign="center" size="medium">
				<Icon name="add user" circular />
				<Header.Content>Sign up</Header.Content>
			</Header>
			<Form
				error
				loading={loading && !props.errorMsg ? true : false}
				onSubmit={props.handleSubmit(onSubmit)}
			>
				{_displayErrorMsg()}
				<Segment raised attached>
					<Form.Group widths="equal">
						<Field
							name="email"
							type="email"
							label="Email"
							component={_renderMail}
						/>
						<Field
							name="username"
							type="text"
							label="Username"
							component={_renderUsername}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Field
							name="password"
							type="password"
							label="Password"
							component={_renderPassword}
						/>
						<Field
							name="confirm_password"
							type="password"
							label="Confirm password"
							component={_renderPassword}
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
};

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
