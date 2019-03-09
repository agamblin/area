import authState from './authState';
import userState from './userState';
import projectState from './projectState';
import googleState from './googleState';
import githubState from './githubState';
import trelloState from './trelloState';
import selectedProjectState from './selectedProjectState';
import selectedCardState from './selectedCardState';
import selectedMemberState from './selectedMemberState';

export default interface globalState {
	auth: authState;
	user: userState;
	google: googleState;
	github: githubState;
	trello: trelloState;
	selectedProject: selectedProjectState;
	selectedCard: selectedCardState;
	selectedMember: selectedMemberState;
	projects: Array<projectState>;
	form: any;
}
