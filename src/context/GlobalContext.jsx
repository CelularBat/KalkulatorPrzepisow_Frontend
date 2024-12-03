import React, { createContext, useState } from 'react';

// Default React behaviour is to update all component which consume context when any value changes
// So getValue ans setValue were separated to 2 different contexts so setting msg won't update
// the component which called it (and all other callers)

const GetMsgContext = createContext(null);
const SetMsgContext = createContext(null);

const GlobalContextProvider = ({children})=>{

    const [G_ShowMsg,setG_ShowMsg] = useState("Witaj !");
    const [G_ShowMsg_Type,setG_ShowMsg_Type] = useState(1);

    function showMsg(text,type=1){
        setG_ShowMsg(text);
        setG_ShowMsg_Type(type);
    }

    return(
        <SetMsgContext.Provider value={{showMsg}}>
        <GetMsgContext.Provider value={{G_ShowMsg,G_ShowMsg_Type}}>    
                {children}    
        </GetMsgContext.Provider>  
        </SetMsgContext.Provider>
    );
}


export {GetMsgContext,SetMsgContext};