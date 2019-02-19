import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import UserSettings from './settings/UserSettings';

export class UserProfile extends Component {
	state = { activeItem: 'General' };

	handleItemClick: any = (e: any, { name }: { name: string }) =>
		this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		return (
			<Grid>
				<Grid.Column width={4}>
					<Menu fluid vertical tabular>
						<Menu.Item
							name="General"
							active={activeItem === 'General'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name="Services"
							active={activeItem === 'Services'}
							onClick={this.handleItemClick}
						/>
					</Menu>
				</Grid.Column>

				<Grid.Column stretched width={12}>
					<Segment>
						<UserSettings />
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default UserProfile;
