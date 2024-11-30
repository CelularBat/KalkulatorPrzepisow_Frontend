import React, { Component } from 'react';

import PizzaAnimation from "../../common/PizzaAnimation";

class MainPage extends Component {
    render() {
        return (
            <div style={{display:'flex', justifyContent:"center", alignItems:'center'}}>
                <PizzaAnimation />
            </div>
        );
    }
}

export default MainPage;