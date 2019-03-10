import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import globalState from '../../types/states/globalState';

export default (ChildComponent: any) => {
	const ComposedComponent = (props: any) => {
		useEffect(() => {
			if (!props.isLoggedIn) {
				history.push('/signin');
			}
		}, [props.isLoggedIn]);
		return <ChildComponent {...props} />;
	};
	return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: globalState) => {
	return {
		isLoggedIn: state.auth.authenticated
	};
};
