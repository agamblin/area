export default interface googleDriveFolderType {
	id?: number;
	name: string;
	googleId: string;
	accessToken: string;
	destroy?: () => any;
}
