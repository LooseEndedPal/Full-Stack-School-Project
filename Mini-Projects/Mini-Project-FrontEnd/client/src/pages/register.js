function Register() {
    return (
        <div>
            <h2>Register</h2>
            <form action="/register" method="POST">
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <a href="/login">Already have an account? Log in</a>
            <form action="/">
                <button type="submit">Back</button>
            </form>
        </div>
    );
}

export default Register;

