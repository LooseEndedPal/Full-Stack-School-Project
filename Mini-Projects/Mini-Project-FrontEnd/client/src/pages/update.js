function Update() {
    return (
        <div>
            <h1>Add new Post</h1>

            <form action={`/api/add`} method="POST" class="form-example">
                <label for="name">Name of Post: </label>
                <input type="text" name="name" id="name" required />
                <label for="name">Description: </label>
                <input type="text" name="description" id="description" required />
                <button type="submit">Add</button>
            </form>

            <form action="/">
                <button type="submit">Back</button>
            </form>
        </div>
    );
}

export default Update;