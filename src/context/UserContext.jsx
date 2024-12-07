import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserContextProvider = ({children})=>{

    const [G_IsUserLoggedIn,setG_IsUserLoggedIn] = useState(false);
    const [G_UserName,setG_UserName] = useState("Anonim");

    return(
        <UserContext.Provider value={{
            G_IsUserLoggedIn,setG_IsUserLoggedIn,
            G_UserName,setG_UserName
        }}>
            {children}
        </UserContext.Provider>  
    );
}

export {UserContextProvider,UserContext};