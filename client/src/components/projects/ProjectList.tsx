import React, { Component } from 'react';
import { Header, Grid, Card, Image } from 'semantic-ui-react';
import ProjectCreate from './ProjectCreate';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import './css/ProjectList.css';
import { getProjects } from '../../actions/projects';
import projectState from '../../types/states/projectState';
import history from '../../history';

interface ProjectListProps {
	getProjects: () => any;
	projects: Array<projectState>;
}

export class ProjectList extends Component<ProjectListProps> {
	componentDidMount() {
		this.props.getProjects();
	}

	_displayProject = (project: projectState) => {
		return (
			<Card onClick={() => history.push(`/projects/${project.id}`)}>
				<Image
					src={project.imageUrl}
					style={{ height: '150px', width: '260px' }}
				/>
				<Card.Content>
					<Card.Header>{project.name}</Card.Header>
					<Card.Meta>
						<span className="date">Created at {project.createdAt}</span>
					</Card.Meta>
					<Card.Description>{project.description}</Card.Description>
				</Card.Content>
			</Card>
		);
	};

	_displayContent = () => {
		if (this.props.projects.length > 0) {
			return this.props.projects.map(project => {
				return (
					<Grid.Column key={project.id}>
						{this._displayProject(project)}
					</Grid.Column>
				);
			});
		}
		return null;
	};

	render() {
		return (
			<React.Fragment>
				<Header
					as="h1"
					content="Your projects"
					subheader="Manage all your projects in one place"
					dividing
				/>
				<Grid columns={4} stackable className="m-t-sm">
					{this._displayContent()}
				</Grid>
				<ProjectCreate />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		projects: state.projects
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			getProjects
		}
	)(ProjectList)
);
