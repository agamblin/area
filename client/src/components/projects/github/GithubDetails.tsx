import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepo } from '../../../actions/github';
import { Segment, Label, Grid, Statistic } from 'semantic-ui-react';
import requireAuth from '../../auth/requireAuth';
import globalState from '../../../types/states/globalState';
import repoState from '../../../types/states/repoState';
import CommitsList from './CommitsList';
import PullRequestsList from './PullRequestsList';
import MemberList from './MembersList';
import BranchList from './BranchList';

interface GithubDetailsProps {
	repoId: string;
	fetchRepo: (repoId: string) => any;
	repo?: repoState;
}

class GithubDetails extends Component<GithubDetailsProps> {
	state = { loading: true };

	async componentDidMount() {
		const { fetchRepo, repoId } = this.props;

		if (fetchRepo) {
			await fetchRepo(repoId);
			this.setState({ loading: false });
		}
	}

	_renderContent = () => {
		const { repo } = this.props;

		if (repo) {
			return (
				<React.Fragment>
					<Grid.Column>
						<CommitsList commits={repo.commits} />
					</Grid.Column>
					<Grid.Column textAlign="center">
						<PullRequestsList pullRequests={repo.pullRequests} />
					</Grid.Column>
					<Grid.Column>
						<MemberList members={repo.members} />
						<BranchList branches={repo.branches} />
					</Grid.Column>
				</React.Fragment>
			);
		}
		return null;
	};

	render() {
		return (
			<Segment loading={this.state.loading} raised>
				<Label
					content="Github"
					icon="github"
					color="black"
					attached="top left"
					as="a"
					href={this.props.repo ? this.props.repo.htmlUrl : null}
				/>
				<Grid columns={3}>{this._renderContent()}</Grid>
			</Segment>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		repo: state.selectedProject.repo
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			fetchRepo
		}
	)(GithubDetails)
);
