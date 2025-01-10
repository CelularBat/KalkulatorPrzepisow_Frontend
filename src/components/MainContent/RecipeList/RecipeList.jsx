import React from 'react';
import './RecipeList.css';

import { API_URLs, fetchAPI } from '../../../API_Handler';
import {UserContext} from '../../../context/UserContext'; 

import TableContainer from '../../common/TableContainer';
import UserRecipes_PrimeTable from './UserRecipes_PrimeTable';
import { SetMsgContext } from '../../../context/GlobalContext';
import { EditRecipeContext } from '../../../context/EditRecipeContext';


const RecipeList = () => {
    const [UserRecipesData,setUserRecipesData] = React.useState([]);
    const [PublicRecipesData,setPublicRecipesData] = React.useState([]);

    const { G_IsUserLoggedIn} = React.useContext(UserContext);
    const {showMsg} = React.useContext(SetMsgContext);
    const {setG_IsFormRecipeInEditMode, setG_EditRecipeData,setG_EditRecipeID } = React.useContext(EditRecipeContext);
    

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

     
    function handleEditRecipe(rowData){
    /* //Depreciated. Flatting array is now on server side

        // function to flat productList: [product:{name:'n'...},portion:100] into [name:'n'... ,portion:100]
        function flattenProducts(rowData){
            const flatProducts = rowData.productsList.map ((p) => { 
                delete p._id;
              return({
                ...p.product,
                portion: p.portion,
              }); 
            })

            return {...rowData,
                productsList: flatProducts
            }
        }
        const flatRowData = flattenProducts(rowData);
        setG_EditRecipeData(flatRowData);
*/
        setG_EditRecipeData(rowData);
        setG_IsFormRecipeInEditMode(true);
        setG_EditRecipeID(rowData._id)
    }



    return (
        <div className='RecipeList'>
            <div className='RecipeList--header'>
             
            </div>
            <div className='RecipeList--tables'>
                <TableContainer title="Moje przepisy:">        
                    <UserRecipes_PrimeTable TableData={UserRecipesData} defaultRows={5}
                    {...{handleDeleteRecipe,handleEditRecipe}}
                    />
                </TableContainer>

                <TableContainer title="Inne przepisy:">        
                    <UserRecipes_PrimeTable TableData={PublicRecipesData} defaultRows={15}
                    {...{handleDeleteRecipe,handleEditRecipe}}
                    />
                </TableContainer>
            </div>

        </div>
    );
};

export default RecipeList;