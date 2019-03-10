import fileState from './fileState';

export default interface folderState {
	id: string;
	files: Array<fileState>;
}
