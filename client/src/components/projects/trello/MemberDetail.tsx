import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Modal,
	Image,
	Header,
	Segment,
	Feed,
	Message,
	List
} from 'semantic-ui-react';
import Spinner from '../../general/Spinner';
import { fetchMember } from '../../../actions/trello';
import globalState from '../../../types/states/globalState';
import selectedMemberState from '../../../types/states/selectedMemberState';
import FeedItem from './FeedItem';

interface MemberDetailProps {
	open: any;
	close: any;
	memberId: string | null;
	fetchMember: (memberId: string) => any;
	selectedMember?: selectedMemberState;
}

class MemberDetail extends Component<MemberDetailProps> {
	state = { loading: true };

	async componentDidUpdate() {
		const { memberId, fetchMember, selectedMember } = this.props;

		if (
			fetchMember &&
			memberId &&
			open &&
			(!selectedMember || selectedMember.id != memberId)
		) {
			await fetchMember(memberId);
			this.setState({ loading: false });
		}
	}

	_closeModal = () => {
		this.setState({ loading: true });
		this.props.close();
	};

	_renderFeed = () => {
		const { selectedMember } = this.props;

		if (selectedMember && selectedMember.activity) {
			if (selectedMember.activity.length > 0) {
				return selectedMember.activity.map(action => (
					<FeedItem key={action.id} action={action} />
				));
			}
			return (
				<List.Item>
					<Message content="No activity yet" />
				</List.Item>
			);
		}
		return null;
	};

	_renderActivityContent = () => {
		const { selectedMember } = this.props;

		if (selectedMember) {
			return (
				<React.Fragment>
					<Header dividing as="h2">
						Activity details for {selectedMember.fullName}
						<Image
							size="small"
							avatar
							style={{ marginLeft: '2.5%' }}
							src={`${selectedMember.avatarUrl}/50.png`}
						/>
					</Header>
					<Modal.Content>
						<Segment raised>
							<Feed size="small">{this._renderFeed()}</Feed>
						</Segment>
					</Modal.Content>
				</React.Fragment>
			);
		}
		return null;
	};

	render() {
		return (
			<Modal
				size="tiny"
				dimmer="blurring"
				open={this.props.open}
				onClose={this._closeModal}
			>
				<Modal.Content style={{ textAlign: 'center' }}>
					<Spinner loading={this.state.loading} />
					{this._renderActivityContent()}
				</Modal.Content>
			</Modal>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		selectedMember: state.selectedMember
	};
};

export default connect(
	mapStateToProps,
	{
		fetchMember
	}
)(MemberDetail);
