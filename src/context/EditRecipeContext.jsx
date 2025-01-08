import React, { createContext, useState } from 'react';

const EditRecipeContext = createContext(null);

const EditRecipeContextProvider = ({children})=>{

    const [G_IsFormRecipeInEditMode,setG_IsFormRecipeInEditMode] = useState(false);
    const [G_EditRecipeData,setG_EditRecipeData] = useState({});
    const [G_EditRecipeID,setG_EditRecipeID] = useState(0);

    return(
        <EditRecipeContext.Provider value={{
            G_IsFormRecipeInEditMode,setG_IsFormRecipeInEditMode,
            G_EditRecipeData,setG_EditRecipeData,
            G_EditRecipeID,setG_EditRecipeID
        }}>
            {children}
        </EditRecipeContext.Provider>  
    );
}

export {EditRecipeContextProvider,EditRecipeContext};