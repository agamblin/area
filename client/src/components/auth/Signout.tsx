import React, { useEffect } from 'react';
import { signout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

const Signout = (props: any) => {
	useEffect(() => {
		props.signout();
	}, []);
	return <Loader />;
};

export default connect(
	null,
	{
		signout
	}
)(Signout);
