export default interface googleProviderType {
	id?: number;
	name: string;
	accessToken: string;
	destroy?: () => any;
	fetchFiles?: () => any;
}
