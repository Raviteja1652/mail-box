import React, { useContext } from 'react';
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import './Navigation.css'
import Context from '../store/Context';

const Navigation = () => {
    const ctx = useContext(Context)
    const location = useLocation();
    const unreadCount = ctx.inboxMails.filter(mail => !mail.isRead).length;
  return (
    <div className='navigation-container'>
        <h2>Mail Box</h2>
        <div className='navigation-links'>
            <ul>
                <li className={location.pathname === '/inbox' ? 'active' : ''} >
                    <Link to='/inbox' onClick={() => ctx.inboxClick()}>Inbox</Link>
                    <span className='unread-count'>{unreadCount}</span>
                </li>
                <li className={location.pathname === '/compose' ? 'active' : ''}>
                    <Link to='/compose'>Compose</Link>
                </li>
                <li className={location.pathname === '/sent' ? 'active' : ''}>
                    <Link to='/sent' onClick={() => ctx.sentClick()}>Sent</Link>
                </li>
                <li>
                    <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
                </li>
            </ul>
            <span className='profile-icon'>{ctx.userMail}</span>
        </div>
    </div>
  )
}

export default Navigation