import React, { useContext, useState } from 'react'
import Context from '../store/Context';
import './Sent.css';

const FullSentMessage = ({mailData, onBackClick}) => {
  return (
    <div>
      <button onClick={onBackClick}>&larr; Back</button>
      <h2>{mailData.subject}</h2>
      <p>{mailData.message}</p>
    </div>
  );
}

const Sent = () => {
    const ctx = useContext(Context);
    const [selectedSent, setSelectedSent] = useState(null);
    const [viewMode, setViewMode] = useState('list');

    const sentClickHandler = (id_mail) => {
      const clickedMail = ctx.sentMails.find(mail => mail.id === id_mail);
      setSelectedSent(clickedMail);
      setViewMode('full');
    };

    const handleBackClick = () => {
      setSelectedSent(null);
      setViewMode('list')
    };

    const sentMails = ctx.sentMails.map(mail => (
        <li key={mail.id} className='sent-mail' onClick={() => sentClickHandler(mail.id)}>
            <h5>To: {mail.recipientMail}</h5>
            <span>{mail.subject} -- {mail.message}</span>
        </li>
    ))
    const sentCount = ctx.sentMails.length;
  return (
    <div>
      <h5>{sentCount} sent mails</h5>
      {viewMode === 'list' && <ul>{sentMails}</ul>}
      {viewMode === 'full' && selectedSent && (
        <FullSentMessage mailData={selectedSent} onBackClick={handleBackClick} />
      )}
    </div>
    
  )
}

export default Sent