import React, { createContext, useState } from 'react';

// Default React behaviour is to update all component which consume context when any value changes
// So getValue ans setValue were separated to 2 different contexts so setting msg won't update
// the component which called it (and all other callers)

/*  Usage: 
 import {SetMsgContext} from GlobalContext
 const {showMsg} = React.usecontext(SetMsgContext)

    showMsg("To jest wiadomość",1);
*/

const GetMsgContext = createContext(null);
const SetMsgContext = createContext(null);

const GlobalContextProvider = ({children})=>{

    const [G_ShowMsg,setG_ShowMsg] = useState("Witaj !");
    const [G_ShowMsg_Type,setG_ShowMsg_Type] = useState(1);
    const [G_reRenderingFlag,setG_reRenderingFlag] = React.useState(false);

    function showMsg(text,type=1){
        setG_ShowMsg(text);
        setG_ShowMsg_Type(type);
        setG_reRenderingFlag(prev=>!prev)
    }

    return(
        <SetMsgContext.Provider value={{showMsg}}>
        <GetMsgContext.Provider value={{G_ShowMsg,G_ShowMsg_Type,G_reRenderingFlag}}>    
                {children}    
        </GetMsgContext.Provider>  
        </SetMsgContext.Provider>
    );
}


export {GlobalContextProvider,GetMsgContext,SetMsgContext};