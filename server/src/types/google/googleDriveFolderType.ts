import googleDriveFileType from './googleDriveFileType';

export default interface googleDriveFolderType {
	id: string;
	name: string;
	accessToken: string;
	fetchFiles?: () => any;
	getGoogleDriveFiles?: (options?: any) => Array<googleDriveFileType>;
	destroy?: () => any;
}
