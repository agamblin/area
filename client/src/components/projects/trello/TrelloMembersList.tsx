import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, List, Image, Label, Segment } from 'semantic-ui-react';
import globalState from '../../../types/states/globalState';
import trelloMemberState from '../../../types/states/trelloMemberState';

interface TrelloMembersListProps {
	members: Array<trelloMemberState>;
}

class TrelloMembersList extends Component<TrelloMembersListProps> {
	_renderHeader = () => {
		const { members } = this.props;

		if (members) {
			return (
				<Statistic
					horizontal
					label={members.length > 1 ? 'members' : 'member'}
					value={members.length}
				/>
			);
		}
		return null;
	};

	_renderMemberList = () => {
		const { members } = this.props;

		if (members) {
			return members.map(member => {
				return (
					<List.Item key={member.id}>
						<Label circular style={{ float: 'right' }} color="red">
							{member.activityCount}
						</Label>
						<Image avatar src={`${member.avatarUrl}/50.png`} />
						<List.Content>
							<List.Header>{member.fullName}</List.Header>
						</List.Content>
					</List.Item>
				);
			});
		}
	};
	render() {
		return (
			<div>
				{this._renderHeader()}
				<Segment raised>
					<List style={{ textAlign: 'left' }} selection verticalAlign="middle">
						{this._renderMemberList()}
					</List>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		members: state.selectedProject.board.members
	};
};

export default connect(mapStateToProps)(TrelloMembersList);
