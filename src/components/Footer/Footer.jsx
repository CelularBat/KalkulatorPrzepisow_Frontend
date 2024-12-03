import React from "react";
import "./Footer.css";

import  {SetMsgContext}  from "../../context/GlobalContext";



function Footer(){
    const u = React.useContext(SetMsgContext);
    console.log("foo renrd");

    const [Test,setTest] = React.useState("");
    
    return (
    <footer>
        <h3>FOOTER</h3>
    </footer>
    )
}

export default Footer;
