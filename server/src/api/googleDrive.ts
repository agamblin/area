import Axios from 'axios';

export default Axios.create({
	baseURL: 'https://www.googleapis.com/drive/v2/'
});
