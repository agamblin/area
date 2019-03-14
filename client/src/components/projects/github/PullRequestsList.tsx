import React, { Component } from 'react';
import pullRequestState from '../../../types/states/pullRequestState';
import { connect } from 'react-redux';
import { executeMergeRequest } from '../../../actions/github';
import {
	Statistic,
	Divider,
	List,
	Card,
	Label,
	Icon,
	Image,
	Button
} from 'semantic-ui-react';

interface PullRequestsListProps {
	pullRequests: Array<pullRequestState>;
	executeMergeRequest: (pullRequestId: string) => any;
}

class PullRequestsList extends Component<PullRequestsListProps> {
	_renderHeader = () => {
		const { pullRequests } = this.props;

		if (pullRequests) {
			return (
				<React.Fragment>
					<Statistic
						horizontal
						label={pullRequests.length > 1 ? 'pull requests' : 'pull request'}
						value={pullRequests.length}
					/>
					<Divider fitted />
				</React.Fragment>
			);
		}
		return null;
	};

	_renderButton = (pullRequest: pullRequestState) => {
		const { executeMergeRequest } = this.props;
		if (pullRequest && executeMergeRequest) {
			if (pullRequest.state === 'open') {
				return (
					<Button
						onClick={() => executeMergeRequest(pullRequest.id)}
						style={{ marginTop: '10%' }}
						positive
						attached="bottom"
					>
						Accept
					</Button>
				);
			}
			return null;
		}
		return null;
	};

	_renderList = () => {
		const { pullRequests } = this.props;

		if (pullRequests) {
			return pullRequests.map(pullRequest => {
				let color: string = 'red';
				if (pullRequest.state === 'open') {
					color = 'lightgreen';
				}
				return (
					<List.Item key={pullRequest.id}>
						<Card raised centered>
							<Card.Content>
								<Label
									attached="top left"
									color="black"
									icon="github"
									as="a"
									href={pullRequest.url}
								/>
								<Icon name="circle" style={{ color, float: 'right' }} />
								<Card.Header as="h2">{pullRequest.title}</Card.Header>
								<Divider fitted style={{ margin: '2.5% 0' }} />
								<Card.Meta>
									<Label
										color="green"
										content={pullRequest.origin}
										size="tiny"
									/>
									<Icon name="arrow right" />
									<Label
										color="blue"
										content={pullRequest.target}
										size="tiny"
									/>
								</Card.Meta>
								<Divider fitted style={{ margin: '2.5% 0' }} />
								<Card.Description>{pullRequest.body}</Card.Description>
								<Card.Content extra style={{ textAlign: 'left' }}>
									<Image
										avatar
										src={pullRequest.creator.avatarUrl}
										floated="left"
									/>
									<p style={{ marginTop: '10%' }}>
										By {pullRequest.creator.name} on{' '}
										<span style={{ fontStyle: 'italic', color: 'grey' }}>
											{pullRequest.createdDate}
										</span>
									</p>
								</Card.Content>
								{this._renderButton(pullRequest)}
							</Card.Content>
						</Card>
					</List.Item>
				);
			});
		}
	};
	render() {
		return (
			<div>
				{this._renderHeader()}
				<List>{this._renderList()}</List>
			</div>
		);
	}
}

export default connect(
	null,
	{
		executeMergeRequest
	}
)(PullRequestsList);
