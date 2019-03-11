import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export class AndroidClient extends Component {
	render() {
		return (
			<div>
				<Button
					positive
					as="a"
					href="/var/www/release/app-release.apk"
					download
				>
					Download APK
				</Button>
			</div>
		);
	}
}

export default AndroidClient;
