import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import trelloActivityState from '../../../types/states/trelloActivityState';

interface FeedItemProps {
	key: string;
	action: trelloActivityState;
}

export class FeedItem extends Component<FeedItemProps> {
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
			case 'addMemberToBoard':
				return ' added a member to the board';
			case 'createCard':
				return this._createCardContent(action);
			case 'updateCard':
				return this._updatedCardContent(action);
			case 'addMemberToCard':
				return this._addMemberCardContent(action);
		}
	};

	render() {
		const { action } = this.props;

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
	}
}

export default FeedItem;
