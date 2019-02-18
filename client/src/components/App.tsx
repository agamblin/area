import React from 'react';
import Header from './general/Header';
import { Route } from 'react-router-dom';
import Signup from './auth/Signup';
import { Container } from 'semantic-ui-react';
import Signout from './auth/Signout';
import Signin from './auth/Signin';

const App = () => {
	return (
		<div style={{ marginTop: '2%' }}>
			<Container textAlign="center">
				<Header />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signout" exact component={Signout} />
			</Container>
		</div>
	);
};

export default App;
