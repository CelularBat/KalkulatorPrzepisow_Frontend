import React from 'react';
import './RecipeList.css';

import { API_URLs, fetchAPI } from '../../../API_Handler';
import {UserContext} from '../../../context/UserContext'; 

import TableContainer from '../../common/TableContainer';
import UserRecipes_PrimeTable from './UserRecipes_PrimeTable';
import { SetMsgContext } from '../../../context/GlobalContext';



const RecipeList = () => {
    const [UserRecipesData,setUserRecipesData] = React.useState([]);
    const [PublicRecipesData,setPublicRecipesData] = React.useState([]);

    const { G_IsUserLoggedIn} = React.useContext(UserContext);
    const {showMsg} = React.useContext(SetMsgContext);

    React.useEffect( ()=>{
        _updateUserRecipes();
        _updatePublicRecipes();
    },[G_IsUserLoggedIn]);

    function _updateUserRecipes(){
        fetchAPI(API_URLs.recipes.getUserRecipes)
        .then( data => {
            setUserRecipesData(data);  
        });
    }

    function _updatePublicRecipes(){
        fetchAPI(API_URLs.recipes.getPublicRecipes)
        .then( data => {
            setPublicRecipesData(data);  
        });
    }

    function handleDeleteRecipe(rowData){
        fetchAPI(API_URLs.recipe.remove,rowData)
        .then( msg => {
            showMsg(msg.msg,msg.status);
            _updateUserRecipes();
        });
    }

    function handleEditRecipe(){

    }



    return (
        <div className='RecipeList'>
            <div className='RecipeList--header'>
             
            </div>
            <div className='RecipeList--tables'>
                <TableContainer className="AddProduct--MyProductsTable-container" 
                        title="Moje przepisy:"
                        NestedTable={
                            <UserRecipes_PrimeTable TableData={UserRecipesData} defaultRows={5}
                            {...{handleDeleteRecipe,handleEditRecipe}}
                    
                            />
                        }
                />
            </div>

        </div>
    );
};

export default RecipeList;