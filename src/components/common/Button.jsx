import React from "react";
import classNames from "classnames";
import log from "../../Logger";
import "./Button.css"


const Button = ({children, type, className, ...rest}) => {

    const avalaibleTypes = ["ok","cancel"];
    if (! avalaibleTypes.includes(type)){
        log.warn(`component Button doesnt have type ${type}. Avalaible styles: ${avalaibleTypes}`);
    }
    let typeClass = `Button_${type}`;
    
    return (
        <>
            <button className = {classNames('Button',typeClass,className)} {...rest}>
                {children}
            </button>
        </>
    );
};

export default Button;