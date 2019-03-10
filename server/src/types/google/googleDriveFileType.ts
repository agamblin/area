export default interface googleDriveFileType {
	id: string;
	name: string;
	downloadUrl: string;
	contentUrl?: string;
	iconUrl?: string;
	thumbnailUrl?: string;
	createdDate: string;
	modifiedDate: string;
	fileExtension: string;
	size?: number;
	accessToken: string;
}
