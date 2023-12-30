import React, { useContext, useState } from 'react'
import Context from '../store/Context'
import './Inbox.css';

const FullMessage = ({mailData, onBackClick}) => {
    return (
        <div>
          <button onClick={onBackClick}>&larr; Back</button>
          <h2>{mailData.subject}</h2>
          <p>{mailData.message}</p>
        </div>
    );
}

const Inbox = () => {
    const ctx = useContext(Context);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [viewMode, setViewMode] = useState('list');

    const inboxClickHandler = (id_mail) => {
        const selectedMail = ctx.inboxMails.find(mail => mail.id === id_mail);
        setSelectedInbox(selectedMail);
        setViewMode('full');
    };
    const handleBackClick = () => {
        setSelectedInbox(null);
        setViewMode('list')
    };
    const inboxList = ctx.inboxMails.map(mail => (
        <li key={mail.id} className='inbox-mail' onClick={() => inboxClickHandler(mail.id)}>
            <h5>From: {mail.senderMail}</h5>
            <span>{mail.subject} - {mail.message}</span>
        </li>
    ));
    const inboxCount = ctx.inboxMails.length;
  return (
    <div>
        <h6>{inboxCount} mails</h6>
        {viewMode === 'list' && <ul>{inboxList}</ul>}
        {viewMode === 'full' && selectedInbox && <FullMessage mailData={selectedInbox} onBackClick={handleBackClick} />}
    </div>
    
  )
}

export default Inbox;