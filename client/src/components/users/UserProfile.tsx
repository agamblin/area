import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import UserSettings from './UserSettings';
import ServicesAuth from '../auth/ServicesAuth';
import history from '../../history';
import * as qs from 'querystring';

export class UserProfile extends Component {
	state = { activeItem: 'General' };

	componentDidMount() {
		const query: any = qs.parse(history.location.search);
		if (query.github) {
			this.setState({ activeItem: 'Services' });
		}
	}

	handleItemClick: any = (e: any, { name }: { name: string }) =>
		this.setState({ activeItem: name });

	renderContent = () => {
		if (this.state.activeItem === 'General') {
			return <UserSettings />;
		}
		return <ServicesAuth />;
	};

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
					<Segment>{this.renderContent()}</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default UserProfile;
