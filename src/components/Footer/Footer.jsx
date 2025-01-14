import React from "react";
import "./Footer.css";

import  {SetMsgContext}  from "../../context/GlobalContext";



function Footer(){
    const u = React.useContext(SetMsgContext);

    const [Test,setTest] = React.useState("");
    
    return (
    <footer>
        <h3>Kalkulator wartości odżywczych przepisów.</h3>
        <span>by CelularBat</span>

    </footer>
    )
}

export default Footer;
