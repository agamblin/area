import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../history';

export default (ChildComponent: any) => {
	const ComposedComponent = (props: any) => {
		useEffect(() => {
			if (!props.isLoggedIn) {
				history.push('/');
			}
		}, [props.isLoggedIn]);
		return <ChildComponent {...props} />;
	};
	return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: any) => {
	return {
		isLoggedIn: state.auth.authenticated
	};
};
