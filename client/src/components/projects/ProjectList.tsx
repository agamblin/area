import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import ProjectCreate from './ProjectCreate';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import './css/ProjectList.css';
import { getProjects } from '../../actions/projects';

interface ProjectListProps {
	getProjects: () => any;
}

export class ProjectList extends Component<ProjectListProps> {
	componentDidMount() {
		this.props.getProjects();
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
					<Grid.Column />
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
