import React, { Component } from 'react';
import { connect } from 'react-redux';
import globalState from '../../../types/states/globalState';
import cardState from '../../../types/states/cardState';
import Spinner from '../../general/Spinner';
import { Label, Card, Header, List } from 'semantic-ui-react';

interface CardsListProps {
	cards?: Array<cardState>;
}

class CardsList extends Component<CardsListProps> {
	_displayContent = () => {
		const { cards } = this.props;

		if (cards) {
			return cards.map((card: cardState) => {
				return (
					<List.Item style={{ marginBottom: '2.5%' }}>
						<Card centered key={card.id}>
							<Label
								as="a"
								href={card.url}
								ribbon
								icon="trello"
								color="green"
								content="Trello"
							/>
							<Card.Content>
								<Card.Header as="H5">{card.name}</Card.Header>
							</Card.Content>
							<Card.Content>
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
