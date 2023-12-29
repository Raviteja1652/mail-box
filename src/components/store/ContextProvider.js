import React, { useState } from "react";
import axios from 'axios';
import Context from "./Context";

const formatMailId = (email) => {
    const formatted = email;
    return formatted;
};

const ContextProvider = props => {
    const [token, setToken] = useState('');
    const [mail, setMail] = useState('');
    const [sentMails, setSentMails] = useState([]);
    const [inboxMails, setInboxMails] = useState([]);
    const isLoggedIn = !!token
    
    const loginHandler = (token, cleanedMail) => {
        setToken(token);
        localStorage.setItem('token', token);
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
        localStorage.removeItem('mailId')
    };
    const onPageLoad = async () => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)
        const localMailId = localStorage.getItem('mailId')
        const formatted = formatMailId(localMailId)
        setMail((prev) => {
            return formatted;
        });
        // try{
        //     const getResponse = await axios.get(`https://react-http-7e214-default-rtdb.firebaseio.com/_${mail}_mails.json`)
        //     const data = await getResponse.data
        //     let filteredData = [];
        //     for (let key in data) {
        //         filteredData.push({...data[key], id:key});
        //     }
        //     setSentMails(filteredData)
        //     console.log(data)
        // } catch(err) {console.log(err)}
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
    }

    const contextValue ={
        token: token,
        isLoggedIn: isLoggedIn,
        sentMails: sentMails,
        login: loginHandler,
        logout: logoutHandler,
        onLoad: onPageLoad,
        sendMail: sendMailHandler,
        inboxMails: inboxMails,
    }

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
};

export default ContextProvider;