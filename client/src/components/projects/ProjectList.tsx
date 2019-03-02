import React, { Component } from 'react';
import { Header, Grid, Placeholder, Segment, Button } from 'semantic-ui-react';
import './css/ProjectList.css';

export class ProjectList extends Component {
	_renderPlaceholder() {
		return (
			<Segment raised>
				<Placeholder>
					<Placeholder.Header image>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
					<Placeholder.Paragraph>
						<Placeholder.Line length="medium" />
						<Placeholder.Line length="short" />
					</Placeholder.Paragraph>
				</Placeholder>
			</Segment>
		);
	}
	render() {
		return (
			<React.Fragment>
				<Header
					as="h1"
					content="Your projects"
					subheader="Manage all your projects in one place"
					dividing
				/>
				<Grid columns={2} stackable className="m-t-sm">
					<Grid.Column>{this._renderPlaceholder()}</Grid.Column>
					<Grid.Column>{this._renderPlaceholder()}</Grid.Column>
					<Grid.Column>{this._renderPlaceholder()}</Grid.Column>
					<Grid.Column>{this._renderPlaceholder()}</Grid.Column>
				</Grid>
				<Button
					circular
					icon="add"
					size="huge"
					color="green"
					className="m-t-sm"
				/>
			</React.Fragment>
		);
	}
}

export default ProjectList;
