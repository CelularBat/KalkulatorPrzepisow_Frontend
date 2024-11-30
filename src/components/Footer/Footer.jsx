import React from "react";
import "./Footer.css";

import  {SetMsgContext}  from "../../context/GlobalContext";

function Footer(){
    const u = React.useContext(SetMsgContext);
    console.log("foo renrd");
    
    return (
    <footer>
        <h3>FOOTER</h3>
        {/* <button onClick={()=>u.setG_ShowMsg("dupa")} >test</button> */}
    </footer>
    )
}

export default Footer;
