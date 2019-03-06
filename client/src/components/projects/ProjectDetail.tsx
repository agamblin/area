import React, { Component } from 'react';
import requireAuth from '../auth/requireAuth';

interface ProjectDetailProps {
	projectId?: number | null;
	match: {
		params: {
			projectId: number;
		};
	};
}

export class ProjectDetail extends Component<ProjectDetailProps> {
	componentDidMount = () => {
		console.log(this.props.match.params.projectId);
	};

	render() {
		return <div>ProjectDetail</div>;
	}
}

export default requireAuth(ProjectDetail);
