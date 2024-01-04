import React, { useState } from "react";
import axios from 'axios';
import Context from "./Context";

const formatMailId = (email) => {
    const formatted = email;
    return formatted;
};
const cleanHandler = (mail) => {
    const cleanedMail = (mail.replace('@', '')).replace('.', '').replace('.', '');
    return cleanedMail;
}

const ContextProvider = props => {
    const [token, setToken] = useState('');
    const [mail, setMail] = useState('');   // cleaned mail
    const [userMail, setUserMail] = useState('');   // loggedIn mail
    const [sentMails, setSentMails] = useState([]);
    const [inboxMails, setInboxMails] = useState([]);
    const isLoggedIn = !!token
    
    const loginHandler = (token, cleanedMail, enteredEmail) => {
        setToken(token);
        localStorage.setItem('token', token);
        setUserMail(enteredEmail)
        localStorage.setItem('userMail', enteredEmail)
        const formattedMailId = formatMailId(cleanedMail)

        setMail((prev) => {
          console.log(prev);
          console.log(formattedMailId);
          return formattedMailId;
        });

        localStorage.setItem('mailId', formattedMailId)
    };
    const logoutHandler = () => {
        setToken('')
        setMail('')
        localStorage.removeItem('token');
        localStorage.removeItem('mailId');
        localStorage.removeItem('userMail')
    };
    const onPageLoad = async () => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)
        const localMailId = localStorage.getItem('mailId')
        const formatted = formatMailId(localMailId)
        
        setMail((prev) => {
            return formatted;
        });

        const userMailId = localStorage.getItem('userMail');
        const formattedMail = formatMailId(userMailId);
        setUserMail((prev) => {
            return formattedMail
        });

        try{
            const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${formatted}_mails.json`)
            const data = await getResponse.data
            let filteredData = [];
            for (let key in data) {
                filteredData.push({...data[key], id:key});
            }
            setSentMails(filteredData)
            console.log(data)
        } catch(err) {console.log(err)}

        try{
            const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${formatted}_inboxMails.json`)
            const data = await getResponse.data
            let filteredData = [];
            for (let key in data) {
                filteredData.push({...data[key], id:key});
            }
            setInboxMails(filteredData)
            console.log(data)
        } catch(err) {console.log(err)}
    };
    const sendMailHandler = async (mailData) => {
        try{
            const postRes = await axios.post(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_mails.json`, mailData)
            const data = await postRes.data
            console.log(data)
        } catch(err){
            console.log(err)
        };
        try{
            const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_mails.json`)
            const data = await getResponse.data
            let filteredData = [];
            for (let key in data) {
                filteredData.push({...data[key], id:key});
            }
            setSentMails(filteredData)
            console.log(data)
        } catch(err) {console.log(err)}
        // setSentMails([...sentMails, data])
        const recipientMail = mailData.recipientMail;
        const cleanedRecepMail = cleanHandler(recipientMail)
        try{
            const postRes = await axios.post(`https://react-http-7e214-default-rtdb.firebaseio.com/_${cleanedRecepMail}_inboxMails.json`, mailData)
            const data = await postRes.data
            console.log(data)
        } catch(err){
            console.log(err)
        };
    };
    const inboxClickHandler = async () => {
        try{
            const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_inboxMails.json`)
            const data = await getResponse.data
            let filteredData = [];
            for (let key in data) {
                filteredData.push({...data[key], id:key});
            }
            setInboxMails(filteredData)
            console.log(data)
        } catch(err) {console.log(err)}
    };
    const sentClickHandler = async () => {
        try{
            const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_mails.json`)
            const data = await getResponse.data
            let filteredData = [];
            for (let key in data) {
                filteredData.push({...data[key], id:key});
            }
            setSentMails(filteredData)
            console.log(data)
        } catch(err) {console.log(err)}
    };
    const deleteMailHandler = async(id) => {
        try{
            const delData = await axios.delete(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_inboxMails/${id}.json`)
            const data = await delData.data
            console.log(data)
            // console.log('Succesfully Deleted')
            alert('Mail successfully deleted');
        } catch(err) {console.log(err)}
        setInboxMails((prev) => {
            const updatedMails = prev.filter(mail => mail.id !== id)
            return updatedMails;
        })
    };
    const readMailHandler = async (id) => {
        setInboxMails(prev => {
            const updated = prev.map(mail => mail.id === id ? { ...mail, isRead: true } : mail);
            return updated
        })
        try {
            const firebaseUrl = `https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_inboxMails/${id}.json`;
            const response = await axios.get(firebaseUrl);
            const mailData = response.data;
            mailData.isRead = true;
            await axios.put(firebaseUrl, mailData);
        } catch (error) {
            console.error('Error updating mail:', error);
        }
    };
    const changeMailHandler = async (selected) => {
        try{
            const response = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_inboxMails.json`)
            const data = await response.data;

            let filteredMails = [];
            for (let key in data) {
                if (selected === 'all') {
                    filteredMails.push({ ...data[key], id: key });
                } else if (selected === 'read' && data[key]?.isRead) {
                    filteredMails.push({ ...data[key], id: key });
                } else if (selected === 'unread' && !data[key]?.isRead) {
                    filteredMails.push({ ...data[key], id: key });
                }
            }
            setInboxMails(filteredMails);
            // console.log('filtered', filteredMails)
        } catch(err) {console.log(err)}
    }

    const contextValue ={
        token: token,
        userMail: userMail,
        isLoggedIn: isLoggedIn,
        sentMails: sentMails,
        inboxMails: inboxMails,
        login: loginHandler,
        logout: logoutHandler,
        onLoad: onPageLoad,
        sendMail: sendMailHandler,
        inboxClick: inboxClickHandler,
        sentClick: sentClickHandler,
        deleteMail: deleteMailHandler,
        readMail: readMailHandler,        
        changeMail: changeMailHandler,
    }

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
};

export default ContextProvider;