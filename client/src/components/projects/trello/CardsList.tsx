import React, { Component } from 'react';
import { connect } from 'react-redux';
import globalState from '../../../types/states/globalState';
import cardState from '../../../types/states/cardState';
import Spinner from '../../general/Spinner';
import { Label, Card, Header, List } from 'semantic-ui-react';
import CardDetail from './CardDetail';

interface CardsListProps {
	cards?: Array<cardState>;
}

class CardsList extends Component<CardsListProps> {
	state = { detailOpen: false, cardId: null };

	show = (cardId: string) => this.setState({ detailOpen: true, cardId });
	close = () => this.setState({ detailOpen: false });

	_displayContent = () => {
		const { cards } = this.props;

		if (cards) {
			return cards.map((card: cardState) => {
				return (
					<List.Item key={card.id} style={{ marginBottom: '2.5%' }}>
						<Card centered>
							<Label
								as="a"
								href={card.url}
								ribbon
								icon="trello"
								color="green"
								content="Trello"
							/>
							<Card.Content
								onClick={() => this.show(card.id)}
								style={{ cursor: 'pointer' }}
							>
								<Card.Header as="h5">{card.name}</Card.Header>
							</Card.Content>
							<Card.Content
								onClick={() => this.show(card.id)}
								style={{ cursor: 'pointer' }}
							>
								<Card.Description>{card.description}</Card.Description>
							</Card.Content>
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
				<Header as="h2" dividing>
					Last cards
				</Header>
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
