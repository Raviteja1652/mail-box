import React, { useContext, useState } from 'react'
import Context from '../store/Context';
import './Sent.css';

const FullSentMessage = ({mailData, onBackClick}) => {
  return (
    <div className='full-message'>
      <button onClick={onBackClick} className='back-button'>&larr; Back</button>
      <h2>{mailData.subject}</h2>
      <div className='full-Sentmsg-detail'>
        <h6>From: {mailData.senderMail} (you) </h6>
        <h6>To: {mailData.recipientMail}</h6>
      </div>
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
            <h5 className='recep-mail'>To: {mail.recipientMail}
              <span className='inner-mail'>{mail.subject} -- {mail.message}</span>
            </h5>
            
        </li>
    ))
    const sentCount = ctx.sentMails.length;
  return (
    <div className='sent-mails'>
      <h5 className='sent-count'>{sentCount} sent mails</h5><hr />
      {viewMode === 'list' && <ul>{sentMails}</ul>}
      {viewMode === 'full' && selectedSent && (
        <FullSentMessage mailData={selectedSent} onBackClick={handleBackClick} />
      )}
    </div>
    
  )
}

export default Sent;