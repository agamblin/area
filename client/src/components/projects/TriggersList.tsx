import React, { Component } from 'react';
import { Modal, Button, Icon, Checkbox, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
	githubIssuesTrigger,
	githubPrTrigger,
	trelloCardTrigger
} from '../../actions/projects';
import globalState from '../../types/states/globalState';
import selectedProject from '../../reducers/selectedProject';
import selectedProjectState from '../../types/states/selectedProjectState';

interface TriggersListProps {
	githubIssuesTrigger?: () => any;
	githubPrTrigger?: () => any;
	trelloCardTrigger?: () => any;
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

	_renderTrelloGithubTrigger = () => {
		const { trelloCardTrigger, selectedProject } = this.props;

		if (trelloCardTrigger && selectedProject) {
			return (
				<div style={{ marginTop: '2.5%' }}>
					<Checkbox
						toggle
						checked={selectedProject.triggerCardsPr}
						label="Trello cards create new Github PR"
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
		trelloCardTrigger
	}
)(TriggersList);
