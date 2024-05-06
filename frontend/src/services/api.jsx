import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.3:3000/api',
  "Content-type": "application/json"
});

export default instance;
