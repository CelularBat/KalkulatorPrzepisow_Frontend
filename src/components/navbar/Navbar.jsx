//import UserPanel from "./UserPanel";

import React from "react";
import LoginForm from "./LoginForm";
import UserPanel from "./UserPanel";

import "./Navbar.css";
import Flex from '@react-css/flex';

import { API_URLs,fetchAPI } from "../../API_Handler";
import {SetMsgContext} from '../../context/GlobalContext'; 
import { UserContext } from "../../context/UserContext";


function Navbar(props){ 

   const {showMsg} = React.useContext(SetMsgContext);
   const {  G_IsUserLoggedIn,setG_IsUserLoggedIn,
      G_UserName,setG_UserName } = React.useContext(UserContext);

   React.useEffect(()=>{
      fetchAPI(API_URLs.user.islogged,{})
      .then(result=>{
         if (result && result.isLogged){
            setG_IsUserLoggedIn(true);
            setG_UserName(result.userName);
         }
      });
   },[]);

   function handleLogin(user,pass){
      fetchAPI(API_URLs.user.login,{user:user, password: pass })
      .then(result=>{
         showMsg(result.msg,result.status );
         if (result.status == 1){
            setG_IsUserLoggedIn(true);
            setG_UserName(user);
         }
      });
      
    }
    
   function handleRegister(user,pass){
      fetchAPI(API_URLs.user.register,{user:user, password: pass })
      .then(result=>{
         showMsg(result.msg,result.status );
         if (result.status == 1){
            setG_IsUserLoggedIn(true);
            setG_UserName(user);
         }
      })
    }

    function handleLogout(){
      fetchAPI(API_URLs.user.logout,{})
      .then(result=>{
         showMsg(result.msg,result.status )
         if (result.status == 1){
            setG_IsUserLoggedIn(false);
         }
      })
      
    }
   

   const isActive = (key)=>{
      return (props.activePageIdx === key)?"pg active":"pg";
   }

return(
<header>
   <Flex as="nav" row justifySpaceBetween
   className="nav">
    
      <p className={isActive(0)} key="0" onClick={()=>props.cbPageChoice(0)}>Strona Główna</p>
      <p className={isActive(1)} key="1" onClick={()=>props.cbPageChoice(1)}>Dodaj Produkt</p>
      <p className={isActive(2)} key="2" onClick={()=>props.cbPageChoice(2)}>Dodaj Przepis</p>
      <p className={isActive(3)} key="3" onClick={()=>props.cbPageChoice(3)}>Lista Przepisów</p>
      
         {G_IsUserLoggedIn?
             <UserPanel {...{G_UserName,handleLogout}}/>
            :<LoginForm {...{handleLogin,handleRegister}}/>
         }   
         
      
  </Flex>
  
</header>);
}
export default Navbar;