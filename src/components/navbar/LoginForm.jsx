import styles from "./LoginForm.module.css";
// import "./LoginForm.css";
import React from "react";

class LoginForm extends React.Component{
 
constructor(props) {
    super(props);
    this.state = {
        userLogin: '',
        userPassword: '',
        shrinked: false
    };

    this.inputLog_handleChange = this.inputLog_handleChange.bind(this);
    this.inputPass_handleChange = this.inputPass_handleChange.bind(this);
    this.register_handleclick = this.register_handleclick.bind(this);
    this.login_handleclick = this.login_handleclick.bind(this);

    this.containerRef = React.createRef();
}

inputLog_handleChange(event){
    this.setState({
        userLogin: event.target.value
    })
}


inputPass_handleChange(event){
    this.setState({
        userPassword: event.target.value
    })
}

register_handleclick(){
// API here
console.log(this.state.userLogin , this.state.userPassword);
}

login_handleclick(){
  //API here
    console.log(this.state.userLogin , this.state.userPassword);
}


// Shrink login window when clicked outside
componentDidMount() {
  document.addEventListener('click', this.handleClickOutside);
}

componentWillUnmount() {
  document.removeEventListener('click', this.handleClickOutside);
}

handleClickOutside = (event)=>{
  
  if ( this.containerRef.current.contains(event.target)){
    this.setState({shrinked: false});
  } else {
    this.setState({shrinked: true});
  }
};

render(){  
return(

<div 
  ref={this.containerRef} 
  className={styles.container+ (this.state.shrinked ?' '+styles.shrinked : '')} 
  id="container"
>
  <input type="radio" name="tab" id="signin" defaultChecked/>
  <input type="radio" name="tab" id="register"/>

  <div className={styles.tabs} id="tabs">
    <label className={styles.tab} htmlFor="signin">
      <div className={styles.text}>Zaloguj</div>
    </label>
    <label className={styles.tab} htmlFor="register">
      <div className={styles.text}>Zarejestruj</div>
    </label>
  </div>
  <div className={styles.pages} id="pages">
    <div className={styles.page}>
      <div className={styles.input}>
        <div className={styles.title}><i className="material-icons"></i> NAZWA UŻYTKOWNIKA</div>
        <input className={styles.text} type="text" placeholder="" onChange={this.inputLog_handleChange}/>
      </div>
      <div className={styles.input}>
        <div className={styles.title}><i className="material-icons"></i> HASŁO</div>
        <input className={styles.text} type="password" placeholder="" onChange={this.inputPass_handleChange} />
      </div>
      <div className={styles.input}>
        <input type="submit" value="WEJDŹ" id="login_submit" onClick={this.login_handleclick}/>
        <div className={styles.title} id="status_log"></div>
      </div>
    </div>
    <div className={`${styles.page} ${styles.signup}`}>
      <div className={styles.input}>
        <div className={styles.title}><i className="material-icons"></i> NAZWA UŻYTKOWNIKA</div>
        <input className={styles.text} type="text" placeholder="" onChange={this.inputLog_handleChange}/>
      </div>
      <div className={styles.input}>
        <div className={styles.title}><i className="material-icons"></i> HASŁO</div>
        <input className={styles.text} type="password" placeholder="" onChange={this.inputPass_handleChange}/>
      </div>
      <div className={styles.input}>
        <input type="submit" value="ZAREJESTRUJ!" id="register_submit" onClick={this.register_handleclick}/>
        <div className={styles.title} id="status_reg"></div>
       
      </div>
    </div>
  </div>

</div>





);}
};




export default LoginForm;