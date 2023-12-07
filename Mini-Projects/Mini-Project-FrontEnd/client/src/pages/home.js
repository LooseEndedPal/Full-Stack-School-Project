import { useState, useEffect } from "react";

function Home() {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const likeClickHandler = (id) => {
        fetch(`/api/posts/like/${id}`).then(x => x.json()).then(() => {
            setRefresh(refresh+1);
        })
    }
    useEffect(() => {
        fetch(`/api/getList`)
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
                    <button onClick={()=>likeClickHandler(posts._id)}>Like</button>
                    <form action={`/api/posts/like/${posts._id}`} onSubmit={(e) => e.preventDefault} method="POST">
                        <button type="submit">Like</button>
                    </form>

                    <form action={`/api/posts/dislike/${posts._id}`} method="POST">
                        <button type="submit">Dislike</button>
                    </form>

                    <form action={`/api/posts/delete/${posts._id}`} method="POST">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button>Delete {posts.name}</button>
                    </form>
                </div>
            ))}
            <form action= {`/add`}>
                <button type="submit">Add item</button>
            </form>
            <a href="/login">Not logged in? Log In</a>&emsp;<a href="/register">Not Registered? Register</a>&emsp;<a href="/logout">Log out</a>
        </div>
    );
}

export default Home;