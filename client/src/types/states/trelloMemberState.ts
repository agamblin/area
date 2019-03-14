export default interface trelloMemberState {
	id: number;
	trelloId: string;
	fullName: string;
	avatarUrl: string;
	activityCount?: number;
}
