import React, { Component } from 'react';
import commitState from '../../../types/states/commitState';
import { List, Statistic, Segment, Image, Divider } from 'semantic-ui-react';

interface CommitsListProps {
	commits: Array<commitState>;
}

export class CommitsList extends Component<CommitsListProps> {
	_renderListItem = () => {
		const { commits } = this.props;

		if (commits) {
			return commits.map(commit => {
				return (
					<List.Item key={commit.id}>
						<Image avatar src={commit.author.avatarUrl} />
						<List.Content>
							<List.Header>{commit.author.name}</List.Header>
							<List.Description>{commit.message}</List.Description>
						</List.Content>
					</List.Item>
				);
			});
		}
		return null;
	};

	_renderHeader = () => {
		const { commits } = this.props;

		if (commits) {
			return (
				<div style={{ textAlign: 'center' }}>
					<Statistic
						horizontal
						label={commits.length > 1 ? 'commits' : 'commit'}
						value={commits.length}
					/>
					<Divider fitted />
				</div>
			);
		}
		return null;
	};

	render() {
		return (
			<div>
				{this._renderHeader()}
				<Segment raised>
					<List style={{ textAlign: 'left' }} animated>
						{this._renderListItem()}
					</List>
				</Segment>
			</div>
		);
	}
}

export default CommitsList;
