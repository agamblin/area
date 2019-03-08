import boardState from './boardState';
import folderState from './folderState';
import repoState from './repoState';
import projectState from './projectState';

export default interface selectedProjectState extends projectState {
	board: boardState;
	folder: folderState;
	repo: repoState;
}
