import authState from './authState';
import userState from './userState';
import projectState from './projectState';

export default interface globalState {
	auth: authState;
	user: userState;
	projects: Array<projectState>;
	form: any;
}
