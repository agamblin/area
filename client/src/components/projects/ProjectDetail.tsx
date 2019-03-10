import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../actions/projects';
import requireAuth from '../auth/requireAuth';
import globalState from '../../types/states/globalState';
import { Segment, Header, Image, Tab, Button } from 'semantic-ui-react';
import Spinner from '../general/Spinner';
import TrelloDetails from './trello/TrelloDetails';
import FileList from './google/FileList';
import GithubDetails from './github/GithubDetails';
import selectedProjectState from '../../types/states/selectedProjectState';
import history from '../../history';

interface ProjectDetailProps {
	projectId?: number | null;
	getProject: (projectId: number) => any;
	project: selectedProjectState;
	match: {
		params: {
			projectId: number;
		};
	};
}

class ProjectDetail extends Component<ProjectDetailProps> {
	componentDidMount = () => {
		const projectId: number = this.props.match.params.projectId;
		this.props.getProject(projectId);
	};

	_renderTrelloDetails = () => {
		const { project } = this.props;

		if (project.board) {
			return <TrelloDetails boardId={project.board.id} />;
		}
		return <Spinner loading />;
	};

	_renderGoogleDetails = () => {
		const { project } = this.props;

		if (project.folder) {
			return <FileList folderId={project.folder.id} />;
		}
		return <Spinner loading />;
	};

	_renderGithubDetails = () => {
		const { project } = this.props;

		if (project.repo) {
			return <GithubDetails repoId={project.repo.id} />;
		}
	};

	_displayContent = () => {
		const { project } = this.props;

		const panes = [
			{
				menuItem: { key: 'trello', icon: 'trello', content: 'Trello' },
				render: () => <Tab.Pane>{this._renderTrelloDetails()}</Tab.Pane>
			},
			{
				menuItem: { key: 'drive', icon: 'google drive', content: 'Drive' },
				render: () => <Tab.Pane>{this._renderGoogleDetails()}</Tab.Pane>
			},
			{
				menuItem: {
					key: 'github alternate',
					icon: 'git square',
					content: 'Github'
				},
				render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
			}
		];

		if (!project) {
			return <Spinner loading />;
		}
		return (
			<React.Fragment>
				<Button
					floated="left"
					icon="arrow left"
					basic
					color="black"
					size="tiny"
					onClick={() => history.goBack()}
				/>
				<Header as="h1" dividing>
					<Image circular src={project.imageUrl} inline />
					<Header.Content>{project.name}</Header.Content>
					<Header.Subheader>{project.description}</Header.Subheader>
				</Header>
				<Tab panes={panes} style={{ marginTop: '2.5%' }} />
			</React.Fragment>
		);
	};

	render() {
		return <Segment>{this._displayContent()}</Segment>;
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		project: state.selectedProject
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			getProject
		}
	)(ProjectDetail)
);
