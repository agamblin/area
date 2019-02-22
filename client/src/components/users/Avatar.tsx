import React from 'react';
import { Image, Dropdown } from 'semantic-ui-react';
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import './css/Avatar.css';

interface AvatarProps {
	fetchUser?: any;
	username?: string;
	options?: any;
	avatarUrl?: string;
}

class Avatar extends React.Component<AvatarProps> {
	componentDidMount() {
		this.props.fetchUser();
	}

	_getTrigger = () => {
		return (
			<span>
				{this.props.username}
				<Image
					className="avatar-photo"
					avatar
					size="mini"
					src={this.props.avatarUrl}
				/>
			</span>
		);
	};

	_renderDropdown = () => {
		if (this.props.username) {
			const trigger = this._getTrigger();
			return (
				<Dropdown
					trigger={trigger}
					options={this.props.options}
					pointing="top left"
					icon={null}
				/>
			);
		}
		return null;
	};

	render() {
		return <React.Fragment>{this._renderDropdown()}</React.Fragment>;
	}
}

const mapStateToProps = (state: any) => {
	if (state.auth.user) {
		return {
			username: state.auth.user.username,
			avatarUrl: state.auth.user.avatarUrl
		};
	}
	return {};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{ fetchUser }
	)(Avatar)
);
