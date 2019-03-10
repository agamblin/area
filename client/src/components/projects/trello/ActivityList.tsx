import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, Feed, Segment } from 'semantic-ui-react';
import globalState from '../../../types/states/globalState';
import trelloActivityState from '../../../types/states/trelloActivityState';
import FeedItem from './FeedItem';

interface TrelloActivityProps {
	activity: Array<trelloActivityState>;
}

class TrelloActivity extends Component<TrelloActivityProps> {
	_renderHeader = () => {
		const { activity } = this.props;

		if (activity) {
			return (
				<Statistic
					horizontal
					label={activity.length > 1 ? 'actions' : 'action'}
					value={activity.length}
				/>
			);
		}
		return null;
	};

	_renderContent = () => {
		const { activity } = this.props;

		if (activity) {
			return activity.map(action => (
				<FeedItem key={action.id} action={action} />
			));
		}
		return null;
	};

	render() {
		return (
			<div>
				{this._renderHeader()}
				<Segment
					textAlign="center"
					raised
					style={{ overflow: 'auto', maxHeight: '400px' }}
				>
					<Feed size="small">{this._renderContent()}</Feed>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		activity: state.selectedProject.board.activity
	};
};

export default connect(mapStateToProps)(TrelloActivity);
