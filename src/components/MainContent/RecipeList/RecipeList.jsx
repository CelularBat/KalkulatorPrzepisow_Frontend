import React from 'react';
import './RecipeList.css';

import { API_URLs, fetchAPI } from '../../../API_Handler';
import {UserContext} from '../../../context/UserContext'; 

import TableContainer from '../../common/TableContainer';
import UserRecipes_PrimeTable from './UserRecipes_PrimeTable';



const RecipeList = () => {
    const [UserRecipesData,setUserRecipesData] = React.useState([]);
    const [PublicRecipesData,setPublicRecipesData] = React.useState([]);

    const { G_IsUserLoggedIn} = React.useContext(UserContext);

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





    return (
        <div className='RecipeList'>
            <div className='RecipeList--header'>
             
            </div>
            <div className='RecipeList--tables'>
                <TableContainer className="AddProduct--MyProductsTable-container" 
                        title="Moje przepisy:"
                        NestedTable={
                            <UserRecipes_PrimeTable TableData={UserRecipesData} defaultRows={5}
                    
                            />
                        }
                />
            </div>

        </div>
    );
};

export default RecipeList;