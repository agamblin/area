export default interface fileState {
	id: string;
	name: string;
	fileExtension: string;
	downloadUrl: string;
	contentUrl?: string;
	iconUrl?: string;
	thumbnailUrl?: string;
	createdDate: string;
	modifiedDate: string;
	size?: number;
}
