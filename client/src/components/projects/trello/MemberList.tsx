import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, List, Image, Label, Segment } from 'semantic-ui-react';
import globalState from '../../../types/states/globalState';
import trelloMemberState from '../../../types/states/trelloMemberState';
import { closedMemberDetails } from '../../../actions/trello';
import MemberDetail from './MemberDetail';

interface TrelloMembersListProps {
	members: Array<trelloMemberState>;
	closedMemberDetails?: () => any;
}

class TrelloMembersList extends Component<TrelloMembersListProps> {
	state = { detailOpen: false, memberId: null };

	show = (memberId: string) => this.setState({ detailOpen: true, memberId });
	close = () => {
		this.setState({ detailOpen: false, memberId: null });
		if (this.props.closedMemberDetails) {
			this.props.closedMemberDetails();
		}
	};

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
					<List.Item key={member.id} onClick={() => this.show(member.id)}>
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
				<MemberDetail
					open={this.state.detailOpen}
					memberId={this.state.memberId}
					close={this.close}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		members: state.selectedProject.board.members
	};
};

export default connect(
	mapStateToProps,
	{
		closedMemberDetails
	}
)(TrelloMembersList);
