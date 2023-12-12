function Logout() {
    const link = 'https://mini-project-vp38.onrender.com'
    return (
        <div>
            <form action={`${link}/logout`} method="POST">
                <h2>Would you like to logout?</h2>
                <button>Yes</button>
            </form>
            <form action="/">
                <button type="submit">Back</button>
            </form>
        </div>
    );
}

export default Logout;