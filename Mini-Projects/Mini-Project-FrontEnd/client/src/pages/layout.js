import {Link} from 'react-router-dom';

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/add'>Add</Link></li>
                    <li><Link to = '/login'>Login</Link></li>
                    <li><Link to = '/register'>Register</Link></li>
                </ul>
            </nav>

            
        </div>
    );
}

export default Layout;