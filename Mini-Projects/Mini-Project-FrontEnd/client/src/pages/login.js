function Login() {
    return (
        <div>
            <head>
                <title>Login</title>
            </head>
            <h2>Login</h2>
            <form action={`/login`} method="POST">
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Not Registered? Register</a>
            <form action="/">
                <button type="submit">Back</button>
            </form>
        </div>
    );
}
export default Login;