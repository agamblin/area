import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import requireAuth from '../requireAuth';
import * as keys from '../../../keys';
import {
	registerTrelloService,
	resetTrelloService,
	fetchTrelloService
} from '../../../actions/trello';
import * as qs from 'query-string';

interface TrelloLoginProps {
	registerTrelloService: any;
	username?: string;
	resetTrelloService: any;
	fetchTrelloService: any;
	trelloService: boolean;
}

export class TrelloLogin extends Component<TrelloLoginProps> {
	private url?: string;

	constructor(props: TrelloLoginProps) {
		super(props);
		if (process.env.NODE_ENV === 'production') {
			this.url = keys.PROD_URL;
		} else {
			this.url = 'http://localhost:8081';
		}
	}

	componentDidMount() {
		console.log(this.props.trelloService);
		if (this.props.trelloService) {
			console.log('fetching');
			this.props.fetchTrelloService();
		}
		const hashParams = qs.parse(location.hash);
		if (hashParams.token) {
			this.props.registerTrelloService(hashParams.token);
		}
	}

	_renderAccount = () => {
		if (this.props.username) {
			return (
				<Card.Content extra className="social-card">
					Connected as: {this.props.username}
					<p className="reset-link" onClick={this.props.resetTrelloService}>
						reset
					</p>
				</Card.Content>
			);
		}
	};

	render() {
		return (
			<Card>
				<Card.Content>
					<Card.Header>Trello</Card.Header>
				</Card.Content>
				<Card.Content>
					<Button
						icon="trello"
						as="a"
						href={
							'https://trello.com/1/authorize?' +
							qs.stringify({
								expiration: 'never',
								callback_method: 'fragment',
								return_url: `${this.url}/api/auth/oauth/trello/callback`,
								scope: 'read,write,account',
								name: 'Tribe',
								key: keys.TRELLO_KEY,
								response_type: 'token'
							})
						}
						size="massive"
						color="green"
					/>
				</Card.Content>
				{this._renderAccount()}
			</Card>
		);
	}
}

const mapStateToProps = (state: any) => {
	if (state.trello.name) {
		return {
			username: state.trello.name,
			trelloService: state.user.trelloService
		};
	}
	return {
		trelloService: state.user.trelloService
	};
};

export default requireAuth(
	connect(
		mapStateToProps,
		{
			registerTrelloService,
			resetTrelloService,
			fetchTrelloService
		}
	)(TrelloLogin)
);
