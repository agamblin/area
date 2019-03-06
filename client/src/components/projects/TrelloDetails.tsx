import React, { Component } from 'react';
import requireAuth from '../auth/requireAuth';
import { connect } from 'react-redux';
import { fetchBoardCards } from '../../actions/trello';

interface TrelloDetailsProps {
	boardId: number;
	fetchBoardCards?: (boardId: number) => any;
}

class TrelloDetails extends Component<TrelloDetailsProps> {
	componentDidMount() {
		const { boardId } = this.props;
		if (this.props.fetchBoardCards) {
			this.props.fetchBoardCards(boardId);
		}
	}

	render() {
		return <div />;
	}
}

export default requireAuth(
	connect(
		null,
		{
			fetchBoardCards
		}
	)(TrelloDetails)
);
