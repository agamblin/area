import React, { useState } from 'react';
import { Menu, Input, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../users/Avatar';
import './css/Header.css';

interface headerProps {
	authenticated: boolean;
	location?: any;
}

const options = [
	{
		key: 'user',
		text: (
			<Link className="link-dropdown" to="/user/profile">
				Profile
			</Link>
		),
		icon: 'user'
	},
	{
		key: 'sign-out',
		text: (
			<Link className="link-dropdown" to="/signout">
				Sign out
			</Link>
		),
		icon: 'sign out'
	}
];

const Header = (props: headerProps) => {
	const [activeItem, setActiveItem] = useState('');

	const handleItemClick: any = (e: any, { name }: { name: any }) =>
		setActiveItem(name);

	const renderLoginLeft = () => {
		if (props.authenticated) {
			return (
				<React.Fragment>
					<Menu.Item
						as={Link}
						to="/client.apk"
						name="Android"
						active={activeItem === 'Android'}
						onClick={handleItemClick}
					/>
				</React.Fragment>
			);
		}
		return null;
	};

	const renderLoginRight = () => {
		if (!props.authenticated) {
			return (
				<React.Fragment>
					<Menu.Item
						as={Link}
						to="/signup"
						name="Register"
						active={activeItem === 'Register'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to="/signin"
						name="Login"
						active={activeItem === 'Login'}
						onClick={handleItemClick}
					/>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Menu.Item>
						<Input icon="search" placeholder="Search..." />
					</Menu.Item>
					<Menu.Item>
						<Avatar options={options} />
					</Menu.Item>
				</React.Fragment>
			);
		}
	};

	return (
		<Segment raised>
			<Menu secondary>
				<Menu.Item
					as={Link}
					to="/"
					name="home"
					active={activeItem === 'home'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					as={Link}
					to="/services"
					name="services"
					active={activeItem === 'services'}
					onClick={handleItemClick}
				/>
				{renderLoginLeft()}
				<Menu.Menu position="right">{renderLoginRight()}</Menu.Menu>
			</Menu>
		</Segment>
	);
};

const mapStateToProps = (state: any) => {
	return {
		authenticated: state.auth.authenticated
	};
};
export default connect(mapStateToProps)(Header);
