import React, { Component } from 'react';
import {
	Modal,
	Button,
	Label,
	Item,
	Header,
	Grid,
	Segment,
	Divider,
	List,
	Image
} from 'semantic-ui-react';
import { fetchCard } from '../../../actions/trello';
import { connect } from 'react-redux';
import globalState from '../../../types/states/globalState';
import selectedCardState from '../../../types/states/selectedCardState';
import Spinner from '../../general/Spinner';
import trelloMemberState from '../../../types/states/trelloMemberState';
import trelloLabelState from '../../../types/states/trelloLabelState';

interface CardDetailProps {
	open: any;
	close: any;
	cardId: string | null;
	fetchCard?: (cardId: string) => any;
	selectedCard?: selectedCardState;
}

export class CardDetail extends Component<CardDetailProps> {
	componentDidUpdate() {
		const { cardId, fetchCard, selectedCard } = this.props;
		if (
			fetchCard &&
			cardId &&
			open &&
			(!selectedCard || selectedCard.id != cardId)
		) {
			console.log('fetching');
			fetchCard(cardId);
		}
	}

	_renderMemberItem = () => {};

	_renderMembers = () => {
		const { selectedCard } = this.props;

		if (selectedCard && selectedCard.members) {
			return selectedCard.members.map((member: trelloMemberState) => {
				return (
					<List.Item key={member.id}>
						<Image avatar src={`${member.avatarUrl}/50.png`} />
						<List.Content>
							<List.Header>{member.fullName}</List.Header>
						</List.Content>
					</List.Item>
				);
			});
		}
		return null;
	};

	_renderLabels = () => {
		const { selectedCard } = this.props;

		if (selectedCard && selectedCard.labels) {
			if (selectedCard.labels.length > 0) {
				return selectedCard.labels.map((label: trelloLabelState) => {
					return (
						<List.Item key={label.id}>
							<Label color={label.color} content={label.name} />
						</List.Item>
					);
				});
			}
			return <List.Description>None</List.Description>;
		}
		return null;
	};

	_renderCardContent = () => {
		const { selectedCard } = this.props;

		if (selectedCard) {
			return (
				<React.Fragment>
					<Modal.Content style={{ textAlign: 'center' }}>
						<Item>
							<Item.Header>
								<Header as="h1" dividing>
									{selectedCard.name}
								</Header>
							</Item.Header>
							<Item.Meta style={{ marginTop: '2.5%' }}>
								<Label color="red" horizontal>
									Due date:
									<Label.Detail>
										{selectedCard.due ? selectedCard.due : 'none'}
									</Label.Detail>
								</Label>
								<Label as="a" color="teal" horizontal>
									Last activity:
									<Label.Detail>{selectedCard.dateLastActivity}</Label.Detail>
								</Label>
							</Item.Meta>
							<Item.Description style={{ marginTop: '2.5%' }}>
								{selectedCard.description}
							</Item.Description>
							<Item.Extra style={{ marginTop: '2.5%' }}>
								<Segment>
									<Grid columns={2} relaxed="very">
										<Grid.Column>
											<Header as="h3" dividing>
												Members
											</Header>
											<List animated verticalAlign="middle">
												{this._renderMembers()}
											</List>
										</Grid.Column>
										<Grid.Column>
											<Header as="h3" dividing>
												Labels
											</Header>
											<List animated verticalAlign="middle">
												{this._renderLabels()}
											</List>
										</Grid.Column>
									</Grid>
									<Divider vertical>And</Divider>
								</Segment>
							</Item.Extra>
						</Item>
					</Modal.Content>
					{/* <Modal.Actions>
						<Button negative>No</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Yes"
						/>
					</Modal.Actions> */}
				</React.Fragment>
			);
		}
		return (
			<Modal.Content>
				<Spinner loading />
			</Modal.Content>
		);
	};

	render() {
		return (
			<Modal
				size="tiny"
				dimmer="blurring"
				open={this.props.open}
				onClose={this.props.close}
			>
				{this._renderCardContent()}
			</Modal>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		selectedCard: state.selectedCard
	};
};

export default connect(
	mapStateToProps,
	{
		fetchCard
	}
)(CardDetail);
