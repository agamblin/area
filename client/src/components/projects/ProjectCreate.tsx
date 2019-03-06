import React, { Component } from 'react';
import { Modal, Button, Ref, Form, Grid, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createProject } from '../../actions/project';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import Spinner from '../general/Spinner';
import ImageProject from './ImageProject';
import './css/ProjectCreate.css';

interface ProjectCreateProps extends InjectedFormProps {
	createProject: (formValues: any, file: any) => boolean;
}

export class ProjectCreate extends Component<ProjectCreateProps> {
	private form: any;
	state = {
		open: false,
		dimmer: undefined,
		file: null,
		loading: false,
		error: false
	};

	show = (dimmer: any) => () => this.setState({ dimmer, open: true });
	close = () => {
		this.setState({ open: false });
	};

	constructor(props: any) {
		super(props);
		this.form = React.createRef();
	}

	_renderErrors = (meta: any) => {
		if (meta.error && meta.touched) {
			return <Message size="mini" error content={meta.error} />;
		}
	};

	// Render input of the form
	_renderTextInput = (props: any) => {
		return (
			<React.Fragment>
				<Form.Input type="text" {...props.input} placeholder={props.label} />
				{this._renderErrors(props.meta)}
			</React.Fragment>
		);
	};

	_renderTextArea = (props: any) => {
		return (
			<React.Fragment>
				<Form.TextArea
					type="textarea"
					{...props.input}
					placeholder={props.label}
				/>
				{this._renderErrors(props.meta)}
			</React.Fragment>
		);
	};

	_renderImage = () => {
		if (this.state.file) {
			return (
				<ImageProject
					onChange={(e: any) => this.setState({ file: e.target.files[0] })}
					imageUrl={URL.createObjectURL(this.state.file)}
				/>
			);
		}
		return (
			<ImageProject
				onChange={(e: any) => this.setState({ file: e.target.files[0] })}
			/>
		);
	};

	// Form related
	onSubmit = async (formValues: any) => {
		this.setState({ loading: true });
		const error: boolean = await this.props.createProject(
			formValues,
			this.state.file
		);
		this.setState({ loading: false, file: null, error });
		console.log(error);
		if (!error) {
			this.close();
		}
	};

	submitForm = () => {
		this.form.current.dispatchEvent(new Event('submit'));
	};

	_renderErrorMessageHeader = () => {
		if (this.state.error) {
			return (
				<Message
					style={{ textAlign: 'center' }}
					warning
					size="small"
					header="Missing some services"
					content="Check services page to see if Github, Trello and Google are enabled"
				/>
			);
		}
		return null;
	};

	_renderModalContent = () => {
		return (
			<React.Fragment>
				<Modal.Header className="centered">Add a new project</Modal.Header>
				<Modal.Content>
					<Spinner loading={this.state.loading} />
					{this._renderErrorMessageHeader()}
					<Grid divided="vertically">
						<Grid.Row columns={2}>
							<Grid.Column width={4} textAlign="center">
								{this._renderImage()}
							</Grid.Column>
							<Grid.Column width={12}>
								<Ref innerRef={this.form}>
									<Form onSubmit={this.props.handleSubmit(this.onSubmit)} error>
										<Field
											name="name"
											label="Project name"
											component={this._renderTextInput}
										/>
										<Field
											name="description"
											label="Give us some details about this project..."
											component={this._renderTextArea}
										/>
									</Form>
								</Ref>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={this.close}>
						Cancel
					</Button>
					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Create"
						onClick={this.submitForm}
					/>
				</Modal.Actions>
			</React.Fragment>
		);
	};

	render() {
		const { open, dimmer } = this.state;

		return (
			<div>
				<Button
					circular
					icon="add"
					size="huge"
					color="green"
					onClick={this.show('blurring')}
					className="m-t-sm"
				/>
				<Modal
					dimmer={dimmer}
					open={open}
					centered={false}
					onClose={this.close}
				>
					{this._renderModalContent()}
				</Modal>
			</div>
		);
	}
}

const validate = (formValues: any) => {
	const errors = {} as any;

	if (!formValues.name) {
		errors.name = 'Name is required';
	} else {
		if (formValues.name.length < 3) {
			errors.name = 'Name must be at least 3 characters';
		}
	}
	if (!formValues.description) {
		errors.description = 'Description is required';
	} else {
		if (formValues.description.length < 20) {
			errors.description = 'Description must be at least 20 characters';
		}
	}
	return errors;
};

const projectForm: any = compose(
	connect(
		null,
		{ createProject }
	),
	reduxForm({ form: 'projectForm', validate: validate })
)(ProjectCreate);

export default projectForm;
