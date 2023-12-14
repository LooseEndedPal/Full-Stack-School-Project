import {Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import Login from './pages/login';
import Update from './pages/update';
import Register from './pages/register';
import Logout from './pages/logout';

function App() {

  return (
    <div>
      <h1>Welcome to BackBook</h1>

      <Layout/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/add' element={<Update />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Routes>
    </div>
  )
}

export default App