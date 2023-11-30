import { React, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import {Home, Layout, Login, Update, Register} from './pages'
import Home from './pages/home'
import Layout from './pages/layout'
import Login from './pages/login';

function App() {


  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");



  useEffect(() =>{
    fetch('/api/check')
    .then((res) => res.json())
    .then((data) => {
      setPosts(data)
      console.log(data)
    })
    console.log("It worked");
  }, [])


  return (
    <div>
      <h1>Welcome to BackBook</h1>

      {posts.map((post) =>
        <div>Post {post.name} &emsp;&emsp;&emsp;Likes: {post.likes}Disikes: {post.dislikes} <br/>{post.name}<br/></div>
      )}
      <Layout/>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App