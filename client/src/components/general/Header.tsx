import React, { useState } from 'react';
import { Menu, Input, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface headerProps {
	authenticated: boolean;
	location?: any;
}

const Header = (props: headerProps) => {
	console.log(props);
	const [activeItem, setActiveItem] = useState('');

	const handleItemClick: any = (e: any, { name }: { name: any }) =>
		setActiveItem(name);

	const renderLeft = () => {
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
					<Menu.Item
						as={Link}
						to="/signout"
						name="logout"
						active={activeItem === 'logout'}
						onClick={handleItemClick}
					/>
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
					to="/pipes"
					name="pipes"
					active={activeItem === 'pipes'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					as={Link}
					to="/services"
					name="services"
					active={activeItem === 'services'}
					onClick={handleItemClick}
				/>
				<Menu.Menu position="right">{renderLeft()}</Menu.Menu>
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
