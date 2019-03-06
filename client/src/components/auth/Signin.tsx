import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { signIn } from '../../actions/auth';
import { compose } from 'redux';
import EmailField from './components/EmailField';
import PasswordField from './components/PasswordField';
import {
	Segment,
	Header,
	Icon,
	Grid,
	Divider,
	Button,
	Form,
	Message,
	Input
} from 'semantic-ui-react';

interface signinProps extends InjectedFormProps {
	signIn: any;
	handleSubmit: any;
	errorMsg: string;
}

class Signin extends React.Component<signinProps> {
	state = { loading: false };

	_renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			return <Message error content={meta.error} />;
		}
	};

	onSubmit = (formValues: any) => {
		this.setState({ loading: false });
		this.props.signIn(formValues);
	};

	_displayErrorMsg = () => {
		if (this.props.errorMsg) {
			return (
				<React.Fragment>
					<Message error content={this.props.errorMsg} />
				</React.Fragment>
			);
		}
	};

	_renderPassword = (props: any) => {
		return <PasswordField {...props} _renderErrors={this._renderErrors} />;
	};

	_renderMail = (props: any) => {
		return <EmailField {...props} _renderErrors={this._renderErrors} />;
	};

	render() {
		return (
			<Segment raised padded="very">
				<Header as="h2" icon textAlign="center" size="medium">
					<Icon name="arrow right" circular />
					<Header.Content>Sign in</Header.Content>
				</Header>
				<Segment placeholder padded="very">
					<Grid columns={2} stackable textAlign="center">
						<Divider vertical>Or</Divider>
						<Grid.Row verticalAlign="middle">
							<Grid.Column>
								<Form
									error
									loading={
										this.state.loading && !this.props.errorMsg ? true : false
									}
									onSubmit={this.props.handleSubmit(this.onSubmit)}
								>
									{this._displayErrorMsg()}
									<Form.Group widths="equal">
										<Field
											name="email"
											label="Email"
											component={this._renderMail}
										/>
									</Form.Group>
									<Form.Group widths="equal">
										<Field
											name="password"
											label="Password"
											component={this._renderPassword}
										/>
									</Form.Group>
									<Button fluid type="submit" positive>
										Sign in
									</Button>
								</Form>
							</Grid.Column>
							<Grid.Column>
								<Header icon>
									<Icon name="add user" />
								</Header>
								<Button as={Link} to="/signup" basic color="black">
									Sign up
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</Segment>
		);
	}
}

const validate = (formValues: any) => {
	const errors = {} as any;

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}
	if (!formValues.password) {
		errors.password = 'You must provide a password';
	}
	return errors;
};

const mapStateToProps = (state: any) => {
	return {
		errorMsg: state.auth.errorMessage
	};
};

const signinForm: any = compose(
	connect(
		mapStateToProps,
		{
			signIn
		}
	),
	reduxForm({ form: 'signin', validate })
)(Signin);

export default signinForm;
