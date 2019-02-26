import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';

export class TrelloLogin extends Component {
	render() {
		return (
			<Card>
				<Card.Content>
					<Card.Header>Trello</Card.Header>
				</Card.Content>
				<Card.Content>
					<Button icon="trello" size="massive" color="green" />
				</Card.Content>
			</Card>
		);
	}
}

export default TrelloLogin;
