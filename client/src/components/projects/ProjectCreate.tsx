import React, { Component } from 'react';
import { Modal, Button, Ref, Form, Grid, Placeholder } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createProject } from '../../actions/project';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import './css/ProjectCreate.css';

export class ProjectCreate extends Component<any> {
	private form: any;
	state = { open: false, dimmer: undefined };

	show = (dimmer: any) => () => this.setState({ dimmer, open: true });
	close = () => {
		this.setState({ open: false });
	};

	constructor(props: any) {
		super(props);
		this.form = React.createRef();
	}

	// Render input of the form
	_renderTextInput = (props: any) => {
		return (
			<Form.Input type="text" {...props.input} placeholder={props.label} />
		);
	};

	_renderTextArea = (props: any) => {
		return (
			<Form.TextArea
				type="textarea"
				{...props.input}
				placeholder={props.label}
			/>
		);
	};

	_renderImage = () => {
		return (
			<Placeholder style={{ height: 130, width: 180 }}>
				<Placeholder.Image />
			</Placeholder>
		);
	};

	// Form related
	onSubmit = (formValues: any) => {
		this.props.createProject(formValues);
	};

	submitForm = () => {
		// this.form.dispatchEvent(new Event('submit'));
		this.form.current.dispatchEvent(new Event('submit'));
		this.close();
	};

	_renderModalContent = () => {
		return (
			<React.Fragment>
				<Modal.Header className="centered">Add a new project</Modal.Header>
				<Modal.Content>
					<Grid divided="vertically">
						<Grid.Row columns={2}>
							<Grid.Column width={4}>{this._renderImage()}</Grid.Column>
							<Grid.Column width={12}>
								<Ref innerRef={this.form}>
									<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
				<Modal dimmer={dimmer} open={open} onClose={this.close}>
					{this._renderModalContent()}
				</Modal>
			</div>
		);
	}
}

const projectForm: any = compose(
	connect(
		null,
		{ createProject }
	),
	reduxForm({ form: 'projectForm' })
)(ProjectCreate);

export default projectForm;
