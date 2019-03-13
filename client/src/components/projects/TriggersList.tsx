import React, { Component } from 'react';
import { Modal, Button, Icon, Checkbox, Label, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
	githubIssuesTrigger,
	githubPrTrigger,
	trelloCardTriggerPr,
	trelloCardTriggerIssue
} from '../../actions/projects';
import globalState from '../../types/states/globalState';
import selectedProjectState from '../../types/states/selectedProjectState';

interface TriggersListProps {
	githubIssuesTrigger?: () => any;
	githubPrTrigger?: () => any;
	trelloCardTriggerPr?: () => any;
	trelloCardTriggerIssue?: () => any;
	selectedProject?: selectedProjectState;
}

class TriggersList extends Component<TriggersListProps> {
	_renderGithubTrelloIssuesTrigger = () => {
		const { githubIssuesTrigger, selectedProject } = this.props;

		if (githubIssuesTrigger && selectedProject) {
			return (
				<div>
					<Checkbox
						toggle
						checked={selectedProject.triggerIssuesCards}
						label="Github issues create new trello cards"
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
		const { githubPrTrigger, selectedProject } = this.props;

		if (githubPrTrigger && selectedProject) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						checked={selectedProject.triggerPrCards}
						label="Github PR create new trello cards"
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

	_renderTrelloGithubIssueTrigger = () => {
		const { trelloCardTriggerIssue, selectedProject } = this.props;

		if (trelloCardTriggerIssue && selectedProject) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						checked={selectedProject.triggerCardsIssue}
						label="Trello cards create new Github issue"
						onChange={trelloCardTriggerIssue}
					/>
					<Popup
						size="tiny"
						trigger={
							<Label color="green" style={{ float: 'right' }}>
								<Icon name="trello" />
								<Icon name="arrow right" />
								<Icon name="github alternate" />
							</Label>
						}
						content={<p>Must be of format: Title: "FIX: title"</p>}
					/>
				</div>
			);
		}
		return null;
	};

	_renderTrelloGithubPrTrigger = () => {
		const { trelloCardTriggerPr, selectedProject } = this.props;

		if (trelloCardTriggerPr && selectedProject) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						checked={selectedProject.triggerCardsPr}
						label="Trello cards create new Github PR"
						onChange={trelloCardTriggerPr}
					/>
					<Popup
						size="tiny"
						trigger={
							<Label color="green" style={{ float: 'right' }}>
								<Icon name="trello" />
								<Icon name="arrow right" />
								<Icon name="github alternate" />
							</Label>
						}
						content={
							<p>Must be of format: Title: "PR: name ([origin] => [target])"</p>
						}
					/>
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
						{this._renderTrelloGithubPrTrigger()}
						{this._renderTrelloGithubIssueTrigger()}
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		selectedProject: state.selectedProject
	};
};

export default connect(
	mapStateToProps,
	{
		githubIssuesTrigger,
		githubPrTrigger,
		trelloCardTriggerPr,
		trelloCardTriggerIssue
	}
)(TriggersList);
