import {React, useState} from 'react'

function App(){
  
  const [posts, setPosts] = useState([]);
  const[newPost, setNewPost] = useState("");

  const event = (e)=>{
    e.preventDefault();
    setPosts([...posts, newPost]);
    setNewPost('');
  }

  return(
    <div>
      <h1>Welcome to BackBook</h1>
      <form onSubmit={event}>
        <label><h3>Add a post</h3></label>
        <input type = 'text' value = {newPost} onChange={(c) => setNewPost(c.target.value)}></input>
        <button type = 'submit'>Post</button>
      </form>

      <PrintList postList = {posts}/>
    </div>
  )
}

function PrintList(props){
  return(
    <div>
      <h3>Your posts</h3>
      {props.postList.map((post, index) =>
        <div key = {index}>{post}</div>
      )}
    </div>
  );
  
}

export default App