import React from "react";

const Context = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => {},
})

export default Context