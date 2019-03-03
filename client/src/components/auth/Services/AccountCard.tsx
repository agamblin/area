import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

interface AccountCardProps {
	username: string;
	resetFunction: any;
}

export class AccountCard extends Component<AccountCardProps> {
	render() {
		return (
			<Card.Content extra className="social-card">
				Connected as: {this.props.username}
				<p className="reset-link" onClick={this.props.resetFunction}>
					reset
				</p>
			</Card.Content>
		);
	}
}

export default AccountCard;
