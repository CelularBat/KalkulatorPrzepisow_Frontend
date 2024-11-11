import "./Maincontent.css"

import AddProduct from "./AddProduct/AddProduct";
import MainPage from "./MainPage/MainPage";

function MainContent(props){

let mainContent;
    switch (props.activePageIdx){
        case 0: mainContent = <MainPage />
            break;
        case 1: mainContent = <AddProduct IsInRecipeMode={false}/>
            break;
        case 2: mainContent = <AddProduct IsInRecipeMode={true}/>
            break;
    } 

    return(
        <div className="MainContent">
            {mainContent}
        </div>
    );
    
}
export default MainContent;