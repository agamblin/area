export default interface trelloActionType {
	id: string;
	type: string;
	date: string;
	idTargetMember?: string;
	idTargetCard?: string;
	TrelloMemberId: string;
	TrelloBoardId: string;
}
