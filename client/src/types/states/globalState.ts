import authState from './authState';
import userState from './userState';
import projectState from './projectState';
import googleState from './googleState';
import githubState from './githubState';
import trelloState from './trelloState';

export default interface globalState {
	auth: authState;
	user: userState;
	google: googleState;
	github: githubState;
	trello: trelloState;
	projects: Array<projectState>;
	form: any;
}
