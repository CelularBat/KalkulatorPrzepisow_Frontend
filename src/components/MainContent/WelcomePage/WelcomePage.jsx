import React, { Component } from 'react';

import PizzaAnimation from "../../common/PizzaAnimation";

class WelcomePage extends Component {
    render() {
        return (
        <div className='WelcomePage' 
        style={{display:'flex',flexDirection:'column', justifyContent:"center", alignItems:'center'}}>
        
        
            <h2>Strona główna w budowie</h2>
            <h3>Tu będą najpopularniejsze przepisy</h3>
            <div style={{display:'flex', justifyContent:"center", alignItems:'center', marginTop:'15px'}}>
                <PizzaAnimation />
            </div>
        </div>
        );
    }
}

export default WelcomePage;