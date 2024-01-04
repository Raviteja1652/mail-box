import React, { useContext, useRef, useState } from 'react'
import Context from '../store/Context'
import './Inbox.css';

const FullMessage = ({mailData, onBackClick, onDelete}) => {
    
    return (
        <div className='full-msg'>
          <button onClick={onBackClick}>&larr; Back</button>
          <button onClick={() => onDelete(mailData.id)} className='delete-button'>delete</button><hr />
          <h3>{mailData.subject}</h3>
          <div className='full-msg-detail'>
            <h6>From: {mailData.senderMail} </h6>
            <h6>To: {mailData.recipientMail} (you)</h6>
          </div>
          <p className='inbox-message'>{mailData.message}</p>
        </div>
    );
}

const Inbox = () => {
    const ctx = useContext(Context);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const selectedFilter = useRef('all')

    const formatTime = (time) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(time);
    }

    const inboxClickHandler = (id_mail) => {
        const selectedMail = ctx.inboxMails.find(mail => mail.id === id_mail);
        ctx.readMail(id_mail);
        setSelectedInbox(selectedMail);
        setViewMode('full');
    };
    const handleBackClick = () => {
        setSelectedInbox(null);
        setViewMode('list')
    };
    const deleteMailHandler = (id) => {
        alert('Are you sure to delete this Mail');
        ctx.deleteMail(id);
        setSelectedInbox(null);
        setViewMode('list')
    };

    const inboxList = ctx.inboxMails.map(mail => (
        <li key={mail.id} className='inbox-mail' onClick={() => inboxClickHandler(mail.id)}>
            {/* <div className={mail.isRead ? 'read' : 'unread'}/> */}
            <h5 className='sender-mail'>{mail.senderMail}
                <span className='inner-sentmail'>{mail.subject} - {mail.message}</span>
                <p className={mail.isRead ? 'read' : 'unread'}/>     
            </h5>
            {/* <span>{formatTime(mail.date)}</span> */}
                   
        </li>
    ));
    
    const inboxCount = ctx.inboxMails.length;
  return (
    <div className='inbox-mails'>
        <div className='filter-count'>
            <select className='inbox-filter' ref={selectedFilter} onChange={() => ctx.changeMail(selectedFilter.current.value)}>
                <option value='all'>All</option>
                <option value='read'>Read</option>
                <option value='unread'>Unread</option>
            </select>
            <h5 className='mail-count'>{inboxCount} mails</h5>
        </div><hr />
        {viewMode === 'list' && <ul>{inboxList}</ul>}
        {viewMode === 'full' && selectedInbox && (
            <FullMessage mailData={selectedInbox} onBackClick={handleBackClick} onDelete={deleteMailHandler} />
        )}
    </div>
    
  )
}

export default Inbox;