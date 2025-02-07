import axios from 'axios';

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  header: {
    'Content-Type': 'application/json',
  },
});

export default baseAxios;
