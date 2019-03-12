import React, { Component } from 'react';
import { Modal, Button, Icon, Checkbox, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
	githubIssuesTrigger,
	githubPrTrigger,
	trelloCardTrigger
} from '../../actions/projects';

interface TriggersListProps {
	githubIssuesTrigger?: () => any;
	githubPrTrigger?: () => any;
	trelloCardTrigger?: () => any;
}

class TriggersList extends Component<TriggersListProps> {
	_renderGithubTrelloIssuesTrigger = () => {
		const { githubIssuesTrigger } = this.props;

		if (githubIssuesTrigger) {
			return (
				<div>
					<Checkbox
						toggle
						label="Create Trello cards depending on new Github issues"
						onChange={githubIssuesTrigger}
					/>
					<Label color="black" style={{ float: 'right' }}>
						<Icon name="github alternate" />
						<Icon name="arrow right" />
						<Icon name="trello" />
					</Label>
				</div>
			);
		}
		return null;
	};

	_renderGithubTrelloPrTrigger = () => {
		const { githubPrTrigger } = this.props;

		if (githubPrTrigger) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						label="Create Trello cards depending on new Github PR"
						onChange={githubPrTrigger}
					/>
					<Label color="black" style={{ float: 'right' }}>
						<Icon name="github alternate" />
						<Icon name="arrow right" />
						<Icon name="trello" />
					</Label>
				</div>
			);
		}
		return null;
	};

	_renderTrelloGithubTrigger = () => {
		const { trelloCardTrigger } = this.props;

		if (trelloCardTrigger) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						label="Create Pull requests depending on Trello cards"
						onChange={trelloCardTrigger}
					/>
					<Label color="green" style={{ float: 'right' }}>
						<Icon name="trello" />
						<Icon name="arrow right" />
						<Icon name="github alternate" />
					</Label>
				</div>
			);
		}
		return null;
	};
	render() {
		return (
			<div>
				<Modal
					centered={false}
					trigger={
						<Button basic color="black" style={{ float: 'right' }}>
							<Icon name="tencent weibo" />
							Triggers
						</Button>
					}
					size="small"
				>
					<Modal.Header style={{ textAlign: 'center' }}>
						<Icon name="tencent weibo" />
						Triggers
					</Modal.Header>
					<Modal.Content>
						{this._renderGithubTrelloIssuesTrigger()}
						{this._renderGithubTrelloPrTrigger()}
						{this._renderTrelloGithubTrigger()}
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

export default connect(
	null,
	{
		githubIssuesTrigger,
		githubPrTrigger,
		trelloCardTrigger
	}
)(TriggersList);
