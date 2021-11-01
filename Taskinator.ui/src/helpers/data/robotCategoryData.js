import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getRobotCategories = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/RobotCategories`).then((response) => resolve(response.data)).catch(reject);
});

export default getRobotCategories;
