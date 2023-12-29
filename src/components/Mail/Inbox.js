import React, { useContext } from 'react'
import Context from '../store/Context'

const Inbox = () => {
    const ctx = useContext(Context)
    const inboxList = ctx.inboxMails.map(mail => (
        <li key={mail.id}>
            <h5>From: {mail.senderMail}</h5>
            <span>{mail.subject} - {mail.message}</span>
        </li>
    ))
  return (
    <ul>
        {inboxList}
    </ul>
  )
}

export default Inbox