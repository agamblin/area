import Axios from 'axios';

export default Axios.create({
	baseURL: 'https://api.trello.com/1/'
});
