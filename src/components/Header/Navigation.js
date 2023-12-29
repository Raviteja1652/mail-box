import React, { useContext } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './Navigation.css'
import Context from '../store/Context';
import Card from '../card/Card';
import Compose from '../Mail/Compose';
import Auth from '../Auth/Auth';
import Sent from '../Mail/Sent';

const Navigation = () => {
    const ctx = useContext(Context)
  return (
    <div>
        <h2>Mail Box</h2>
        <div>
            <ul>
                <li>
                    <Link to='/inbox'>Inbox</Link>
                </li>
                <li>
                    <Link to='/compose'>Compose</Link>
                </li>
                <li>
                    <Link to='/sent'>Sent</Link>
                </li>
                <li>
                    <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
                </li>
            </ul>
        </div>
        {/* <Card> */}
            {/* <Switch> */}
                {/* <Route path='/login'><Auth /></Route> */}
                {/* <Route path='/logout'>(<Redirect to='/login'><Auth /></Redirect>)</Route>
                <Route path='/compose'><Compose /></Route>
                <Route path='/sent'><Sent /></Route> */}
            {/* </Switch> */}
        {/* </Card> */}
    </div>
    // <header className='header'>
    //     <Link to='/'>
    //         <div className='logo'>Mail Box</div>
    //     </Link>
    //     <nav>
    //         <ul>
    //             <li>
    //                 <Link to='/profile'>Profile</Link>
    //             </li>
    //             {/* <li>
    //                 <Link to='/login'>Login</Link>
    //             </li> */}
    //             <li>
    //                 <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
    //             </li>
    //         </ul>
    //     </nav>
    // </header>
  )
}

export default Navigation