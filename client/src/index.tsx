import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Root from './Root';
import { Router, Route } from 'react-router-dom';
import history from './history';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
	<Root>
		<Router history={history}>
			<Route path="/" component={App} />
		</Router>
	</Root>,
	document.querySelector('#root')
);
