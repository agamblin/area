import React, { Component } from 'react';
import githubMemberState from '../../../types/states/githubMemberState';
import { Segment, List, Image, Statistic } from 'semantic-ui-react';

interface MemberListProps {
	members: Array<githubMemberState>;
}

class MembersList extends Component<MemberListProps> {
	_renderMembers = () => {
		const { members } = this.props;

		if (members) {
			return members.map(member => {
				return (
					<List.Item key={member.id}>
						<Image avatar src={member.avatarUrl} />
						<List.Content>
							<List.Header as="a">{member.name}</List.Header>
							<List.Description>{member.admin ? 'Admin' : ''}</List.Description>
						</List.Content>
					</List.Item>
				);
			});
		}
	};

	_renderHeader = () => {
		const { members } = this.props;

		if (members) {
			return (
				<Statistic
					size="small"
					horizontal
					label={members.length > 1 ? 'members' : 'member'}
					value={members.length}
				/>
			);
		}
		return null;
	};

	render() {
		return (
			<Segment>
				{this._renderHeader()}
				<List style={{ textAlign: 'left' }} animated>
					{this._renderMembers()}
				</List>
			</Segment>
		);
	}
}

export default MembersList;
