import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions';
import { compose } from 'redux';
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

interface signinProps {
	signIn: any;
	handleSubmit: any;
	errorMsg: string;
}

const Signin = (props: signinProps) => {
	const _renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			console.log('error:', meta.error);
			return <Message error content={meta.error} />;
		}
	};

	const [loading, setLoading] = useState(false);

	const onSubmit = (formValues: any) => {
		setLoading(true);
		props.signIn(formValues);
	};

	const _displayErrorMsg = () => {
		if (props.errorMsg) {
			return (
				<React.Fragment>
					<Message error content={props.errorMsg} />
				</React.Fragment>
			);
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
								loading={loading && !props.errorMsg ? true : false}
								onSubmit={props.handleSubmit(onSubmit)}
							>
								{_displayErrorMsg()}
								<Form.Group widths="equal">
									<Field
										name="email"
										type="email"
										label="Email"
										component={_renderMail}
									/>
								</Form.Group>
								<Form.Group widths="equal">
									<Field
										name="password"
										type="password"
										label="Password"
										component={_renderPassword}
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
};

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
