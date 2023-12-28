import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import Context from '../store/Context';

const Navigation = () => {
    const ctx = useContext(Context)
  return (
    <header className='header'>
        <Link to='/'>
            <div className='logo'>Mail Box</div>
        </Link>
        <nav>
            <ul>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                {/* <li>
                    <Link to='/login'>Login</Link>
                </li> */}
                <li>
                    <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navigation