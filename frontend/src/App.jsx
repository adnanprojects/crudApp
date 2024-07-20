import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './assets/users/login';
import Register from './assets/users/register';
import Dashboard from './assets/users/Dashboard';
import Home from './assets/posts/Home';
import Create from './assets/posts/Create';
import Update from './assets/posts/Update';
import AuthRoutes from './routes/AuthRoutes';
import GuestRoutes from './routes/GuestRoutes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >

          <Route index element={<Home />} />

          <Route element={<AuthRoutes />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='create' element={<Create />} />
            <Route path='update' element={<Update />} />
          </Route>

          <Route element={<GuestRoutes />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
