import { useState, useEffect } from "react";

function Home() {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const clickHandler = (id, type) => {
        fetch(`/api/posts/${type}/${id}`).then(x => x.json()).then(() => {
            setRefresh(refresh+1);
        })
    }

    useEffect(() => {
        fetch(`/api/getList`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
                console.log("Pong");
            })
            .catch((err) =>
                console.log("It didn't work cause of this: ", err)
            )
        console.log("Pong");
    }, [refresh])

    return (
        <div>
            <h1>My Posts</h1>

            {posts.map((posts) => (
                <div key={posts.id}>

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

            <br />
        </div>
    );
}

export default Home;