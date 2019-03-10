import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepo } from '../../../actions/github';

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
		return <div>GithubDetails</div>;
	}
}

export default connect(
	null,
	{
		fetchRepo
	}
)(GithubDetails);
