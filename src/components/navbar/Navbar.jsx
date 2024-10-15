//import UserPanel from "./UserPanel";

import LoginForm from "./LoginForm";
import "./Navbar.css";
import Flex from '@react-css/flex';

function Navbar(props){ 
   
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
      <div id="loginForm">
         {props.LOGGED_IN?
            <h1>Cześć</h1>
            :<LoginForm />
         }   
         
      </div>
  </Flex>
  
</header>);
}
export default Navbar;