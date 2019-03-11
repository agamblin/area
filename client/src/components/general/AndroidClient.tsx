import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export class AndroidClient extends Component {
	render() {
		return (
			<div>
				<a href="/var/www/release/app-release.apk" download>
					Download
				</a>
			</div>
		);
	}
}

export default AndroidClient;
