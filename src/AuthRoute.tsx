import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = !!localStorage.getItem('JWTtoken');
  return isAuth ? children : <Navigate to="/todo-frontend/signin" />;
};

export default AuthRoute;
