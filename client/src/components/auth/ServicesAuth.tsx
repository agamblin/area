import React, { Component } from 'react';
import GoogleLogin from './Services/GoogleLogin';

export class ServicesAuth extends Component {
	render() {
		return (
			<div>
				<GoogleLogin />
			</div>
		);
	}
}

export default ServicesAuth;
