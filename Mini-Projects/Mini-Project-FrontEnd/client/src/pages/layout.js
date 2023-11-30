import {Link} from 'react-router-dom';

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li>Wahey</li>
                </ul>
            </nav>
        </div>
    );
}

export default Layout;