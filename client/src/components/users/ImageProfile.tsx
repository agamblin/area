import React from 'react';
import { Image, Button } from 'semantic-ui-react';
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
				<Button as="label" positive htmlFor="upload" size="small">
					Upload
				</Button>
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
