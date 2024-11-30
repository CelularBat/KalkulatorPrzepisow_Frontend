import React from 'react';
import { GetMsgContext,SetMsgContext } from '../../context/GlobalContext';

import "./ShowMessage.css";
import classNames from 'classnames';

const ShowMessage = () => {
  const  {G_ShowMsg, G_ShowMsg_Type}  = React.useContext(GetMsgContext);
  const {showMsg}  = React.useContext(SetMsgContext);
  const [IsVisible, setIsVisible] = React.useState(false);
  const isRunningRef = React.useRef(false); // Ref to prevent re-triggering

  React.useEffect(() => {
    if (G_ShowMsg) {
      setIsVisible(true);
      isRunningRef.current = true; // Mark as running
      
      const timeout = setTimeout(() => {
        setIsVisible(false);
        showMsg(""); 
        isRunningRef.current = false; // Mark as done
      }, 5000);

      
    }
  }, [G_ShowMsg]);

  // Msg types are defined here, can be expanded in the future.
  // Msg style for each class in defined in css
  // style value is compatible with status code from backend
  let styleClass;
  switch (G_ShowMsg_Type){
    case 0: styleClass = "error"; 
    break;
    case 1: styleClass = "ok"; 
    break;
    default: styleClass = "ok"; 
    break;
  }

  return (
    IsVisible && (
      <div className={classNames("ShowMessage",styleClass)}>
        {G_ShowMsg}
      </div>
    )
  );
};

export default ShowMessage;
