import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = ({children})=>{
    const [G_ShowMessageText,setG_ShowMessageText] = useState("Witaj !");
    return(
        <GlobalContext.Provider value={{
            G_ShowMessageText,setG_ShowMessageText
        }}>
            {children}
        </GlobalContext.Provider>  
    );
}

export {GlobalContext,GlobalContextProvider};