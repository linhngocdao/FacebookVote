
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8888/api/',
  timeout: 160000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
