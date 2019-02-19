import React from 'react';
import { Image, Dropdown } from 'semantic-ui-react';
import faker from 'faker';
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import './css/Avatar.css';

interface AvatarProps {
	fetchUser?: any;
	username?: string;
	options?: any;
}

const Avatar = (props: AvatarProps) => {
	React.useEffect(() => {
		props.fetchUser();
	}, []);

	const _getTrigger = () => {
		return (
			<span>
				{props.username}
				<Image
					className="avatar-photo"
					avatar
					size="mini"
					src={faker.image.avatar()}
				/>
			</span>
		);
	};

	const _renderDropdown = () => {
		if (props.username) {
			const trigger = _getTrigger();
			return (
				<Dropdown
					trigger={trigger}
					options={props.options}
					pointing="top left"
					icon={null}
				/>
			);
		}
		return null;
	};

	return <React.Fragment>{_renderDropdown()}</React.Fragment>;
};

const mapStateToProps = (state: any) => {
	if (state.auth.user) {
		return {
			username: state.auth.user.username
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
