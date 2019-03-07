import React, { Component } from 'react';
import { connect } from 'react-redux';
import globalState from '../../../types/states/globalState';
import cardState from '../../../types/states/cardState';
import Spinner from '../../general/Spinner';
import { Segment, Card, Header } from 'semantic-ui-react';

interface CardsListProps {
	cards?: Array<cardState>;
}

class CardsList extends Component<CardsListProps> {
	_displayContent = () => {
		const { cards } = this.props;

		if (cards) {
			return cards.map((card: cardState) => {
				return (
					<Card centered key={card.id}>
						<Card.Content>
							<Card.Header>{card.name}</Card.Header>
							<Card.Meta as="a">{card.url}</Card.Meta>
							<Card.Description>{card.description}</Card.Description>
						</Card.Content>
					</Card>
				);
			});
		}
		return <Spinner loading />;
	};

	render() {
		return (
			<div>
				<Header as="h3" dividing>
					Cards
				</Header>
				{this._displayContent()}
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
