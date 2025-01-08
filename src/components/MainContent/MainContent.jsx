import "./MainContent.css"

import AddProductOrRecipe from "./AddProductOrRecipe/AddProductOrRecipe";
import MainPage from "./WelcomePage/WelcomePage";
import RecipeList from "./RecipeList/RecipeList";



function MainContent(props){

let mainContent;
    switch (props.activePageIdx){
        case 0: mainContent = <MainPage />
            break;
        case 1: mainContent = <AddProductOrRecipe IsInRecipeMode={false}/>
            break;
        case 2: mainContent = <AddProductOrRecipe IsInRecipeMode={true}/>
            break;
        case 3: mainContent = <RecipeList />
            break;
    } 

    return(
        <div className="MainContent">
            {mainContent}
        </div>
    );
    
}
export default MainContent;