import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import UserSettings from './UserSettings';
import ServicesAuth from '../auth/ServicesAuth';
import history from '../../history';
import requireAuth from '../auth/requireAuth';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user';
import * as qs from 'query-string';

interface UserProfileProps {
	fetchUser: any;
	user: any;
}

export class UserProfile extends Component<UserProfileProps> {
	state = { activeItem: 'General' };

	componentDidMount() {
		this.props.fetchUser();
		const query: any = qs.parse(history.location.search);
		if (query.github || query.trello) {
			this.setState({ activeItem: 'Services' });
		}
	}

	handleItemClick: any = (e: any, { name }: { name: string }) =>
		this.setState({ activeItem: name });

	renderContent = () => {
		if (this.props.user) {
			if (this.state.activeItem === 'General') {
				return <UserSettings />;
			}
			return <ServicesAuth header />;
		}
		return null;
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

const mapStateTopProps = (state: any) => {
	if (state.user.id) {
		return {
			user: state.user
		};
	}
	return {};
};

export default requireAuth(
	connect(
		mapStateTopProps,
		{
			fetchUser
		}
	)(UserProfile)
);
