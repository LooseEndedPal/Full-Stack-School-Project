import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

function Layout() {
    const [user, newUser] = useState();

    useEffect(() =>{
        fetch('/api/getUser')
        .then((res) => res.json())
        .then((json) => {
            newUser(json.user.username);
            console.log(user);
        })
        .catch(() =>{
            newUser(null);
        });
    }, [])

    const listUser = () =>{
        return(<div>Welcome {user}</div>);
    }

    return (
        <div>
            {user != null ? listUser() : null}
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