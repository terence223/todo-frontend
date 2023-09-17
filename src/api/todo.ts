import config from './config';
import axios from 'axios';

export interface Todo {
  _id: string;
  title: string;
  checked: boolean;
}

const fetchJWTToken = () => {
  return localStorage.getItem('JWTtoken');
};

export const todoFetchApi = async () => {
  const { data: response } = await axios.get(`${config.apiDomain}/todo/list`, {
    headers: { Authorization: `Bearer ${fetchJWTToken()}` },
  });
  return response;
};

export const todoCreateApi = async (data: Pick<Todo, 'title'>) => {
  const { data: response } = await axios.post(
    `${config.apiDomain}/todo/create`,
    data,
    { headers: { Authorization: `Bearer ${fetchJWTToken()}` } }
  );
  return response;
};

export const todoDeleteApi = async (id: string) => {
  const { data: response } = await axios.delete(
    `${config.apiDomain}/todo/${id}`,
    { headers: { Authorization: `Bearer ${fetchJWTToken()}` } }
  );
  return response;
};
