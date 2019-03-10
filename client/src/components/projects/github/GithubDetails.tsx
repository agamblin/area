import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepo } from '../../../actions/github';
import { Segment, Label } from 'semantic-ui-react';

interface GithubDetailsProps {
	repoId: string;
	fetchRepo: (repoId: string) => any;
}

class GithubDetails extends Component<GithubDetailsProps> {
	async componentDidMount() {
		const { fetchRepo, repoId } = this.props;

		if (fetchRepo) {
			fetchRepo(repoId);
		}
	}

	render() {
		return (
			<Segment>
				<Label
					content="Github"
					icon="github"
					color="black"
					attached="top left"
					as="a"
					href="https://github.com/agamblin/github-repo-test"
				/>
			</Segment>
		);
	}
}

export default connect(
	null,
	{
		fetchRepo
	}
)(GithubDetails);
