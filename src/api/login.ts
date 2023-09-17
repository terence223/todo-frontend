import config from './config';
import axios from 'axios';

export interface User {
  email: string;
  password: string;
  name: string;
}

export const signupApi = async (data: User) => {
  const { data: response } = await axios.post(
    `${config.apiDomain}/signup`,
    data
  );
  return response;
};

export const signinApi = async (data: Pick<User, 'email' | 'password'>) => {
  const { data: response } = await axios.post(
    `${config.apiDomain}/login`,
    data
  );
  return response;
};
