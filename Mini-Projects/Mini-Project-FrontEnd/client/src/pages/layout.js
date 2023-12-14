import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

function Layout() {
    const [user, newUser] = useState();

    useEffect(() =>{
        fetch(`/api/getUser`)
        .then((res) => res.json())
        .then((json) => {
            newUser(json.user.username);
        })
        .catch(() =>{
            newUser(null);
        });
    }, [])

    const listUser = () =>{
        return(
        <div>
            <h1>Welcome {user}</h1>
            <p><Link to = '/logout'>Logout</Link></p>
        </div>);
    }

    return (
        <div>
            {user != null ? listUser() : null}
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {user != null ? <li><Link to='/add'>Add</Link></li> : null}
                    {user == null ? <li><Link to = '/login'>Login</Link></li> : null}
                    {user == null ? <li><Link to = '/register'>Register</Link></li> : null}
                </ul>
            </nav>

        </div>
    );
}

export default Layout;