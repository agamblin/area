import React from 'react';
import Header from './general/Header';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Signup from './auth/Signup';
import SignupDetails from './auth/SignupDetails';
import Signout from './auth/Signout';
import Signin from './auth/Signin';
import AuthServices from './auth/ServicesAuth';
import UserSettings from './users/UserSettings';
import UserProfile from './users/UserProfile';
import ProjectList from './projects/ProjectList';

const App = () => {
	return (
		<div style={{ marginTop: '2%' }}>
			<Container textAlign="center">
				<Header />
				<div style={{ marginTop: '5%' }}>
					<Route path="/" exact component={ProjectList} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/user/details" exact component={SignupDetails} />
					<Route path="/signin" exact component={Signin} />
					<Route path="/signout" exact component={Signout} />
					<Route path="/user/profile" exact component={UserProfile} />
					<Route path="/user/settings" exact component={UserSettings} />
					<Route path="/services" exact component={AuthServices} />
				</div>
			</Container>
		</div>
	);
};

export default App;
