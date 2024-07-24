import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
  // baseURL: 'http://192.168.1.3:3000/api'
});

export default instance;
