import Axios from 'axios';

export default Axios.create({
	baseURL: 'https://github.com/login/oauth'
});
