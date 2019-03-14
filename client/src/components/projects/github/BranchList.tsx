import React, { Component } from 'react';
import branchState from '../../../types/states/branchState';
import { Statistic, Segment, List, Icon } from 'semantic-ui-react';

interface BranchListProps {
	branches: Array<branchState>;
}

class BranchList extends Component<BranchListProps> {
	_renderHeader = () => {
		const { branches } = this.props;

		if (branches) {
			return (
				<Statistic
					horizontal
					size="small"
					label={branches.length > 1 ? 'branches' : 'branche'}
					value={branches.length}
				/>
			);
		}
		return null;
	};

	_renderBranches = () => {
		const { branches } = this.props;

		if (branches) {
			return branches.map(branche => {
				return (
					<List.Item key={branche.name}>
						<Icon name="code branch" style={{ float: 'left ' }} size="small" />
						<List.Header>{branche.name}</List.Header>
					</List.Item>
				);
			});
		}
		return null;
	};

	render() {
		return (
			<Segment>
				{this._renderHeader()}
				<List style={{ textAlign: 'left' }} animated>
					{this._renderBranches()}
				</List>
			</Segment>
		);
	}
}

export default BranchList;
