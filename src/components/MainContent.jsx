import AddRecipe from './AddRecipe/AddRecipe';
import AddProduct from "./AddProduct/AddProduct";
import MainPage from "./MainPage/MainPage";

function MainContent(props){

    switch (props.activePageIdx){
        case 0: return <MainPage />
            break;
        case 1: return <AddProduct />
            break;
        case 2: return <AddRecipe />
            break;
    } 
}
export default MainContent;