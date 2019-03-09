import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, Feed, Segment } from 'semantic-ui-react';
import globalState from '../../../types/states/globalState';
import trelloActivityState from '../../../types/states/trelloActivityState';

interface TrelloActivityProps {
	activity: Array<trelloActivityState>;
}

class TrelloActivity extends Component<TrelloActivityProps> {
	_renderHeader = () => {
		const { activity } = this.props;

		if (activity) {
			return (
				<Statistic
					horizontal
					label={activity.length > 0 ? 'actions' : 'action'}
					value={activity.length}
				/>
			);
		}
		return null;
	};

	_updatedCardContent = (action: trelloActivityState) => {
		if (action.targetCard) {
			return (
				<React.Fragment>
					{' '}
					updated card "{action.targetCard.name}"
				</React.Fragment>
			);
		}
	};

	_createCardContent = (action: trelloActivityState) => {
		if (action.targetCard) {
			return (
				<React.Fragment>
					{' '}
					created card "{action.targetCard.name}"
				</React.Fragment>
			);
		}
	};

	_addMemberCardContent = (action: trelloActivityState) => {
		if (action.targetCard && action.targetMember) {
			return (
				<React.Fragment>
					{' '}
					added <Feed.User>{action.targetMember.fullName}</Feed.User> to card "
					{action.targetCard.name}"
				</React.Fragment>
			);
		}
	};

	_renderType = (action: trelloActivityState) => {
		switch (action.type) {
			case 'createBoard':
				return ' created a board';
			case 'createCard':
				return this._createCardContent(action);
			case 'updateCard':
				return this._updatedCardContent(action);
			case 'addMemberToCard':
				return this._addMemberCardContent(action);
		}
	};

	_renderContent = () => {
		const { activity } = this.props;

		if (activity) {
			return activity.map((action: trelloActivityState) => {
				return (
					<Feed.Event key={action.id}>
						<Feed.Label image={`${action.member.avatarUrl}/50.png`} />
						<Feed.Content>
							<Feed.Date>{action.date}</Feed.Date>
							<Feed.Summary>
								<Feed.User>{action.member.fullName}</Feed.User>
								{this._renderType(action)}
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>
				);
			});
		}
	};

	render() {
		return (
			<div>
				{this._renderHeader()}
				<Segment
					textAlign="center"
					raised
					style={{ overflow: 'auto', maxHeight: '600px' }}
				>
					<Feed size="small">{this._renderContent()}</Feed>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		activity: state.selectedProject.board.activity
	};
};

export default connect(mapStateToProps)(TrelloActivity);
