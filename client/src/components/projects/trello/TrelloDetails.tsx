import React, { Component } from 'react';
import requireAuth from '../../auth/requireAuth';
import { connect } from 'react-redux';
import { fetchBoard } from '../../../actions/trello';
import globalState from '../../../types/states/globalState';
import boardState from '../../../types/states/boardState';
import CardsList from './CardsList';
import TrelloActivity from './ActivityList';
import TrelloMembersList from './MemberList';
import TrelloLists from './ListsList';
import { Grid, Header, Label, Segment } from 'semantic-ui-react';

interface TrelloDetailsProps {
	boardId: string;
	board?: boardState;
	fetchBoard?: (boardId: string) => any;
}

class TrelloDetails extends Component<TrelloDetailsProps> {
	state = { loading: false };

	async componentDidMount() {
		const { boardId } = this.props;
		if (this.props.fetchBoard) {
			this.setState({ loading: true });
			await this.props.fetchBoard(boardId);
			this.setState({ loading: false });
		}
	}

	_displayContent = () => {
		const { board } = this.props;

		if (board) {
			return (
				<Grid columns={3} divided stretched>
					<Grid.Row>
						<Grid.Column>
							<CardsList />
						</Grid.Column>
						<Grid.Column>
							<TrelloActivity />
						</Grid.Column>
						<Grid.Column>
							<TrelloMembersList />
							<TrelloLists lists={board.lists} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			);
		}
		return null;
	};

	render() {
		return (
			<Segment raised loading={this.state.loading}>
				<Label
					icon="trello"
					as="a"
					href={this.props.board ? this.props.board.url : null}
					color="green"
					attached="top left"
					content="Trello"
				/>
				<Header style={{ margin: '2.5% 0' }} as="h2" dividing>
					Trello board
				</Header>
				{this._displayContent()}
			</Segment>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		board: state.selectedProject.board
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			fetchBoard
		}
	)(TrelloDetails)
);
