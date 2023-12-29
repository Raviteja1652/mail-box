import React, { useContext } from 'react'
import Context from '../store/Context'

const Sent = () => {
    const ctx = useContext(Context)
    const sentMails = ctx.sentMails.map(mail => (
        <li key={mail.id}>
            <h5>To: {mail.recipientMail}</h5>
            <span>{mail.subject} -- {mail.message}</span>
        </li>
    ))
  return (
    <ul>
        {sentMails}
    </ul>
  )
}

export default Sent