import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Todolist from './pages/Todolist';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthRoute from './AuthRoute';
import config from './config';

const router = createBrowserRouter([
  { path: `${config.baseUrl}/signin`, element: <Signin /> },
  { path: `${config.baseUrl}/signup`, element: <Signup /> },
  {
    path: `${config.baseUrl}`,
    element: (
      <AuthRoute>
        <Todolist />
      </AuthRoute>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
