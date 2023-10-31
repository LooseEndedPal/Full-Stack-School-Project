import { React, useEffect, useState } from 'react'

function App() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const addNewPost = (e) => {
    e.preventDefault();

    const posting = {
      post: newPost,
      likes: 0
    }

    setPosts([...posts, posting]);
    setNewPost('');
  }

  const like = (index) =>{
    const temp = [... posts];
    temp[index].likes += 1;
    setPosts(temp);
  }

  const acheivements = () =>{
    return(<div>Congratulations you made 5 new posts</div>)
  }

  return (
    <div>
      <h1>Welcome to BackBook</h1>
      <form onSubmit={addNewPost}>
        <label><h3>Add a post</h3></label>
        <input type='text' value={newPost} onChange={(c) => setNewPost(c.target.value)}></input>
        <button type='submit'>Post</button>
      </form>

      <PrintList postList={posts} like = {like}/>

      {posts.length >= 5 ? acheivements() : null}
    </div>
  )
}

function PrintList(props) {
  return (
    <div>
      <h3>Your posts</h3>
      {props.postList.map((post, index) =>
        <div key={index}>Post #{index + 1} &emsp;&emsp;&emsp;Likes: {post.likes} <br/>{post.post}<br/><button onClick={() =>props.like(index)}>Like</button></div>
      )}
    </div>
  );

}

export default App