import React, { Component } from 'react';
import trelloListState from '../../../types/states/trelloListState';
import { List, Statistic, Segment, Icon } from 'semantic-ui-react';

interface TrelloListsProps {
	lists: Array<trelloListState>;
}

class TrelloLists extends Component<TrelloListsProps> {
	_renderHeader = () => {
		const { lists } = this.props;

		if (lists) {
			return (
				<div style={{ textAlign: 'center', marginTop: '3.5%' }}>
					<Statistic
						horizontal
						label={lists.length > 1 ? 'lists' : 'list'}
						value={lists.length}
					/>
				</div>
			);
		}
	};

	_renderListItems = () => {
		const { lists } = this.props;

		if (lists) {
			return lists.map(list => {
				return (
					<List.Item key={list.id}>
						<Icon
							name="circle outline"
							color="green"
							size="tiny"
							style={{ marginRight: '2.5%' }}
						/>
						{list.name}
					</List.Item>
				);
			});
		}
		return null;
	};

	render() {
		return (
			<React.Fragment>
				{this._renderHeader()}
				<Segment raised textAlign="left">
					<List animated>{this._renderListItems()}</List>
				</Segment>
			</React.Fragment>
		);
	}
}

export default TrelloLists;
