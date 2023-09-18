import { Navigate } from 'react-router-dom';
import config from './config';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = !!localStorage.getItem('JWTtoken');
  return isAuth ? children : <Navigate to={`${config.baseUrl}/signin`} />;
};

export default AuthRoute;
