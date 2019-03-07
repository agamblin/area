import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface CardDetailProps {
	open: any;
	close: any;
	cardId?: string | null;
}

export class CardDetail extends Component<CardDetailProps> {
	componentDidMount() {
		console.log('hey');
	}

	render() {
		return (
			<Modal
				size="small"
				dimmer="blurring"
				open={this.props.open}
				onClose={this.props.close}
			>
				<Modal.Header>Delete Your Account</Modal.Header>
				<Modal.Content>
					<p>Are you sure you want to delete your account</p>
				</Modal.Content>
				<Modal.Actions>
					<Button negative>No</Button>
					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Yes"
					/>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default CardDetail;
