import cardState from './cardState';

export default interface boardState {
	id: string;
	url: string;
	cards: Array<cardState>;
}
