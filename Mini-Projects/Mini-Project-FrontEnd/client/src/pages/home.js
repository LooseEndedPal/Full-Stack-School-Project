import { useState, useEffect } from "react";

function Home() {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const link = 'https://mini-project-vp38.onrender.com'
    const clickHandler = (id, type) => {
        fetch(`${link}/api/posts/${type}/${id}`).then(x => x.json()).then(() => {
            setRefresh(refresh+1);
        })
    }

    const connected = () =>{
        fetch(`${link}/api/connected`).then(x => x.json()).then(() => {
            console.log("Pong")
        })
        .catch((err) =>{
            console.log("I had an error")
        })
    }

    useEffect(() => {
        fetch(`${link}/api/getList`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
                console.log(data)
                console.log("Pong");
            })
            .catch((err) =>
                console.log("It didn't work cause of this: ", err)
            )
        console.log("Pong");
    }, [refresh])

    return (
        <div>
            {posts.map((posts) => (
                <div key={posts.id}>
                    <h1>My Posts</h1>

                    <h2>{posts.name}</h2>
                    <p>{posts.description} </p>
                    <p>Likes: {posts.likes} </p>
                    <p>Dislikes: {posts.dislikes}</p>
                    <button onClick={()=>clickHandler(posts._id, "like")}>Like</button>
                    <button onClick={()=>clickHandler(posts._id, "dislike")}>Dislike</button>
                    <form action={`/api/posts/delete/${posts._id}`} method="POST">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button>Delete {posts.name}</button>
                    </form>
                </div>
            ))}
            <button onClick={connected}>Am I connected?</button>
            <form action= {`/add`}>
                <button type="submit">Add item</button>
            </form>
            <a href="/login">Not logged in? Log In</a>&emsp;<a href="/register">Not Registered? Register</a>&emsp;<a href="/logout">Log out</a>
        </div>
    );
}

export default Home;