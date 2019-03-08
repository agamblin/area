import React, { Component } from 'react';
import { connect } from 'react-redux';
import globalState from '../../../types/states/globalState';
import cardState from '../../../types/states/cardState';
import Spinner from '../../general/Spinner';
import { Label, Card, List, Statistic } from 'semantic-ui-react';
import CardDetail from './CardDetail';

interface CardsListProps {
	cards?: Array<cardState>;
}

class CardsList extends Component<CardsListProps> {
	state = { detailOpen: false, cardId: null };

	show = (cardId: string) => this.setState({ detailOpen: true, cardId });
	close = () => this.setState({ detailOpen: false, cardId: null });

	_renderHeader = () => {
		const { cards } = this.props;

		if (cards) {
			return (
				<Statistic
					horizontal
					label={cards.length > 1 ? 'cards' : 'card'}
					value={cards.length}
				/>
			);
		}
	};

	_renderCardDescription = (card: cardState) => {
		if (card.description) {
			return (
				<Card.Content
					onClick={() => this.show(card.id)}
					style={{ cursor: 'pointer' }}
				>
					<Card.Description>{card.description}</Card.Description>
				</Card.Content>
			);
		}
		return null;
	};
	_displayContent = () => {
		const { cards } = this.props;

		if (cards) {
			return cards.map((card: cardState) => {
				return (
					<List.Item key={card.id} style={{ marginBottom: '2.5%' }}>
						<Card centered raised>
							<Label
								as="a"
								href={card.url}
								corner
								icon="trello"
								color="green"
							/>
							<Card.Content
								onClick={() => this.show(card.id)}
								style={{ cursor: 'pointer' }}
							>
								<Card.Header as="h5">{card.name}</Card.Header>
							</Card.Content>
							{this._renderCardDescription(card)}
						</Card>
					</List.Item>
				);
			});
		}
		return <Spinner loading />;
	};

	render() {
		return (
			<div>
				{this._renderHeader()}
				<List animated verticalAlign="middle">
					{this._displayContent()}
				</List>
				<CardDetail
					open={this.state.detailOpen}
					cardId={this.state.cardId}
					close={this.close}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		cards: state.selectedProject.board.cards
	};
};

export default connect(
	mapStateToProps,
	{}
)(CardsList);
