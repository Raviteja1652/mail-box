import React, { useState } from "react";
import Context from "./Context";

const formatMailId = (email) => {
    const formatted = email;
    return formatted;
};

const ContextProvider = props => {
    const [token, setToken] = useState('');
    const [mail, setMail] = useState('')
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

    const contextValue ={
        token: token,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
};

export default ContextProvider;