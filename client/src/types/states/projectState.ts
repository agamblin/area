export default interface projectState {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	userId: number;
	triggerPrCards: boolean;
	triggerIssuesCards: boolean;
	triggerCardsPr: boolean;
	createdAt: string;
}
