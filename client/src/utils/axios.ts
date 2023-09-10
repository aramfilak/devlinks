import axios from 'axios';

const axiosUser = axios.create({
  baseURL: 'https://devlinks-server.vercel.app/api/v1/users',
  responseType: 'json',
});

export { axiosUser };
