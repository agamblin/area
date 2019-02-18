import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import React from 'react';
import reduxThunk from 'redux-thunk';

declare global {
	interface Window {
		gapi: any;
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState: any = {
	auth: { authenticated: localStorage.getItem('tokenTribe') }
};

export default ({ children }: { children: any }) => {
	const store = createStore(
		reducers,
		initialState,
		composeEnhancers(applyMiddleware(reduxThunk))
	);
	return <Provider store={store}>{children}</Provider>;
};
