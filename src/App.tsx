import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Todolist from './pages/Todolist';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthRoute from './AuthRoute';

const router = createBrowserRouter([
  { path: '/todo-frontend/signin', element: <Signin /> },
  { path: '/todo-frontend/signup', element: <Signup /> },
  {
    path: '/todo-frontend/',
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
