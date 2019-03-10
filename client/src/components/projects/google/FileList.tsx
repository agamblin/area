import React, { Component } from 'react';
import {
	Segment,
	Header,
	Grid,
	Statistic,
	Card,
	Image,
	Divider,
	Label,
	Button,
	Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchFolderFiles, uploadGoogleFile } from '../../../actions/google';
import globalState from '../../../types/states/globalState';
import fileState from '../../../types/states/fileState';

interface FileListProps {
	folderId: string;
	fetchFolderFiles?: (folderId: string) => any;
	uploadGoogleFile?: (file: any, folderId: string) => any;
	files?: Array<fileState>;
}

class FileList extends Component<FileListProps> {
	state = { loading: true, file: null };

	async componentDidMount() {
		const { fetchFolderFiles, folderId } = this.props;

		if (fetchFolderFiles) {
			await fetchFolderFiles(folderId);
			this.setState({ loading: false });
		}
	}

	_renderHeader = () => {
		const { files } = this.props;

		if (files) {
			return (
				<Statistic
					horizontal
					label={files.length > 1 ? 'files' : 'file'}
					value={files.length}
				/>
			);
		}
		return null;
	};

	_renderFileContent = (file: fileState) => {
		if (
			file.fileExtension === 'jpg' ||
			file.fileExtension === 'png' ||
			file.fileExtension === 'jpeg'
		) {
			return <Image style={{ height: '150px' }} src={file.thumbnailUrl} />;
		}
		return (
			<div style={{ textAlign: 'center', padding: '5% 0' }}>
				<Image
					style={{ width: '25px', display: 'inline-block' }}
					src={file.iconUrl}
				/>
			</div>
		);
	};

	_onFileChange = async (e: any) => {
		const { uploadGoogleFile, folderId } = this.props;

		if (uploadGoogleFile && fetchFolderFiles) {
			this.setState({ loading: true });
			await uploadGoogleFile(e.target.files[0], folderId);
			this.setState({ loading: false });
		}
	};

	_renderFiles = () => {
		const { files } = this.props;

		if (files) {
			return files.map(file => {
				return (
					<Grid.Column key={file.id}>
						<Card centered raised style={{ textAlign: 'left' }}>
							{this._renderFileContent(file)}
							<Card.Content>
								<Card.Header style={{ marginBottom: '2.5%' }}>
									{file.name}
								</Card.Header>
								<Divider fitted />
								<Card.Meta style={{ marginBottom: '8%' }}>
									<p className="date">Created in {file.createdDate}</p>
									<p className="date">Last updated in {file.modifiedDate}</p>
								</Card.Meta>
								<Card.Description>
									<Label
										style={{ float: 'left' }}
										icon="cloud download"
										color="red"
										as="a"
										href={file.downloadUrl}
										corner="left"
									/>
									<Label
										style={{ float: 'right' }}
										icon="eye"
										color="green"
										as="a"
										href={file.contentUrl}
										corner="right"
									/>
								</Card.Description>
								<Card.Content extra>
									<Label
										attached="bottom"
										color="green"
										content={`${file.size}mb / ${file.fileExtension}`}
									/>
								</Card.Content>
							</Card.Content>
						</Card>
					</Grid.Column>
				);
			});
		}
	};
	render() {
		return (
			<Segment raised loading={this.state.loading}>
				<Label
					attached="top left"
					as="a"
					href={`https://drive.google.com/drive/folders/${this.props.folderId}`}
					icon="google drive"
					content="Drive"
					color="red"
				/>
				<Header style={{ margin: '2.5% 0' }} dividing>
					{this._renderHeader()}
				</Header>
				<Grid columns={3}>{this._renderFiles()}</Grid>
				<Button
					as="label"
					htmlFor="upload"
					style={{ marginTop: '2.5%' }}
					attached="bottom"
					color="red"
				>
					<Icon name="cloud upload" />
					<input
						hidden
						id="upload"
						accept="*"
						type="file"
						onChange={this._onFileChange}
					/>
					Upload file
				</Button>
			</Segment>
		);
	}
}

const mapStateToProps = (state: globalState) => {
	return {
		files: state.selectedProject.folder.files
	};
};

export default connect(
	mapStateToProps,
	{
		fetchFolderFiles,
		uploadGoogleFile
	}
)(FileList);
