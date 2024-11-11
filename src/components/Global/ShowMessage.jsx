import React from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import "./ShowMessage.css"


const ShowMessage = () => {
  const { G_ShowMessageText } = React.useContext(GlobalContext);
  const [IsVisible,setIsVisible] = React.useState(false);

  React.useEffect( ()=>{
    setIsVisible(true);
    const timeout = setTimeout(() => {
        setIsVisible(false);
    }, 5000);

    return ()=>{
        clearTimeout(timeout);
    }

  } ,[G_ShowMessageText]);

  return (
    IsVisible &&
    (
        <div className='ShowMessage'>
        {G_ShowMessageText}
        </div>  
    )
  );
};

export default ShowMessage;
