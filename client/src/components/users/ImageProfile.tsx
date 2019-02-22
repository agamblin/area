import React from 'react';
import { Image, Button, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './css/ImageProfile.css';

interface ImageProfileProps {
	imageUrl?: string;
	avatarUrl?: string;
	onChange?: any;
}

const ImageProfile = (props: ImageProfileProps) => {
	const _renderImage = () => {
		if (props.imageUrl) {
			return (
				<Image
					centered
					circular
					src={props.imageUrl}
					size="small"
					className="image-profile"
				/>
			);
		}
		if (props.avatarUrl) {
			return (
				<Image
					centered
					circular
					src={props.avatarUrl}
					size="small"
					className="image-profile"
				/>
			);
		}
	};
	return (
		<React.Fragment>
			{_renderImage()}
			<React.Fragment>
				<Item.Meta
					as="label"
					htmlFor="upload"
					size="small"
					className="change-image-link"
				>
					Change image
				</Item.Meta>
				<input
					hidden
					id="upload"
					accept="image/*"
					type="file"
					onChange={props.onChange}
				/>
			</React.Fragment>
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => {
	if (state.auth.user) {
		return {
			avatarUrl: state.auth.user.avatarUrl
		};
	}
	return {};
};

export default connect(mapStateToProps)(ImageProfile);
