import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todolist from './pages/Todolist';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
