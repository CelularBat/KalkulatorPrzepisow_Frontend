import React from 'react';
import './AddProductOrRecipe.css'

import RecipeForm from './AddRecipe/RecipeForm';
import ProductForm from './AddProduct/ProductForm';

import UserProducts_PrimeTable from './UserProducts_PrimeTable';
import PublicProducts_PrimeTable from './PublicProducts_PrimeTable';
import TableContainer from 'src/components/common/TableContainer';

import { API_URLs, fetchAPI } from 'src/API_Handler';

import log from 'src/Logger';

import { UserContext } from 'src/context/UserContext';
import { SetMsgContext } from '../../../context/GlobalContext';

function  AddProductOrRecipe({IsInRecipeMode}) {

    

     // States for User Table
     const [UserTableData, setUserTableData] = React.useState( []);
     //States for Public Table
     const [PublicTableData, setPublicTableData] = React.useState( []);

// States to handle Product form
     const [EditRowData, setEditRowData] = React. useState({});
     const [IsProductFormInEditMode,setIsProductFormInEditMode] = React. useState(false);
   
// States to handle Recipe form
     const [AddProductRow,setAddProductRow] = React.useState({});
 
// function for showing popUp
     const {showMsg} = React.useContext(SetMsgContext);


    
     function _updateUserProducts(){
         fetchAPI(API_URLs.products.getUserProducts)
         .then( data => {
             setUserTableData(data);  
         });
     }
 
     function _updatePublicProducts(){
         fetchAPI(API_URLs.products.getPublicProducts)
         .then( data => {
             setPublicTableData(data);  
         });
     }
     // fetch data on first render and when user logged
     const { G_IsUserLoggedIn} = React.useContext(UserContext);
     React.useEffect(()=>{
         _updateUserProducts();
         _updatePublicProducts();  
     },[G_IsUserLoggedIn])
 
///////////////////////////////////
// GUI Functions for Tables action buttons
///////////////////////////////////

// Product Form 

     function onClickEdit(rowData){
         setEditRowData(rowData);
         setIsProductFormInEditMode(true);
         log.debug("Editing product", rowData);
     }
 
// Recipe Form 
 
     function onClickAddToRecipe(rowData){
         setAddProductRow(rowData);
     }
 
///////////////////////////////////
// API Functions
///////////////////////////////////
 
// Product API
     
    // Delete product from user database
    function onClickDelete(rowData){
        fetchAPI(API_URLs.product.remove ,rowData)
        .then( data => {
            if (data.status === 1){
                // reset form on success
                log.info(`Product ${rowData.name} was deleted !`);
                showMsg(`Produkt ${rowData.name} usunięty !`);
                _updateUserProducts();
            } 
            else {
                log.error(data.msg);
                showMsg(`Problem z usunięciem ${rowData.name} !`,0);
            } 
        })
    }

    // Add product to user data base
    function onProductFormSubmit(event,formData){
        event.preventDefault();
        log.debug("Submiting",IsProductFormInEditMode,formData);
        
        let url,okMsg,errMsg;
        if (IsProductFormInEditMode){
            url = API_URLs.product.update;
            okMsg = `Produkt ${formData.name} zmieniony !`;
            errMsg = `Problem z aktualizacją ${formData.name} !`
        } 
        else{
            url = API_URLs.product.add;
            okMsg = `Produkt ${formData.name} dodany !`;
            errMsg = `Problem z dodaniem ${formData.name} !`;
        }


        fetchAPI(url,formData)
        .then( data => {
            if (data.status === 1){
                // reset form on success
                showMsg(okMsg);
                setEditRowData({});
                setIsProductFormInEditMode(false);
                _updateUserProducts();
            } 
            else {
                log.error(data.msg);
                showMsg(errMsg,0);
            } 
        });
    }
  
// Recipe API
   
    function onRecipeFormSubmit(rowsData,title,description,photoURL){
        const obj = {
            name: title,
            description: description,
            photos: [photoURL],
            productsList: rowsData.map((rowData)=>({
                product: rowData._id ,
                portion: rowData.portion
            }))
        }
        log.debug(obj);

        fetchAPI(API_URLs.recipe.add,obj)
        .then( data => {
            if (data.status === 1){
                showMsg(`Przepis ${title} dodany !`);
            } 
            else {
                log.error(data.msg);
                showMsg(`Problem z dodaniem przepisu !`);
            }
            
        });
    }

    function onRecipeFormUpdate(id,rowsData,title,description,photoURL){
        const obj = {
            _id: id,
            name: title,
            description: description,
            photos: [photoURL],
            productsList: rowsData.map((rowData)=>({
                product: rowData._id ,
                portion: rowData.portion
            }))
        }
        log.debug(obj);

        fetchAPI(API_URLs.recipe.update ,obj)
        .then( data => {
            if (data.status === 1){
                showMsg(`Przepis ${title} zmieniony !`);
            } 
            else {
                log.error(data.msg);
                showMsg(`Problem z aktualizowaniem przepisu !`,0);
            }
            
        });
    }
 
    
    return (
        
    <div className="AddProductOrRecipe">

        <div className="AddProductOrRecipe--form-container">
            {IsInRecipeMode ?
                <RecipeForm {...{AddProductRow, onRecipeFormSubmit, onRecipeFormUpdate}} />
                : <ProductForm {...{IsProductFormInEditMode, EditRowData, onProductFormSubmit}} />
            }
        </div>

        <div className="AddProductOrRecipe--tables-container">

            <div className="UserProductsTable-container">
                <TableContainer className="UserProductsTable-container" title="Moje produkty:">
                    <UserProducts_PrimeTable TableData={UserTableData} defaultRows={5} 
                        {...{onClickEdit, onClickDelete, IsInRecipeMode, onClickAddToRecipe}} />
                </TableContainer>
            </div>

            <div className="PublicProductsTable--container">
                <TableContainer className="PublicProductsTable--container" title="Publiczne produkty:">
                    <PublicProducts_PrimeTable TableData={PublicTableData} defaultRows={10} 
                        {...{IsInRecipeMode, onClickAddToRecipe}} />
                </TableContainer>
            </div>

        </div>
        
    </div>      
    );
}

export default  AddProductOrRecipe;