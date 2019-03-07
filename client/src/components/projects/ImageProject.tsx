import React from 'react';
import { Image, Item, Placeholder } from 'semantic-ui-react';

interface ImageProfileProps {
	imageUrl?: string;
	onChange?: any;
}

const imageStyle = {
	height: '127px',
	width: '200px'
};

const ImageProject = (props: ImageProfileProps) => {
	const _renderImage = () => {
		if (props.imageUrl) {
			return (
				<Image
					centered
					src={props.imageUrl}
					size="small"
					style={imageStyle}
					className="image-profile"
				/>
			);
		}
		return (
			<Placeholder>
				<Placeholder.Image style={imageStyle} />
			</Placeholder>
		);
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

export default ImageProject;
