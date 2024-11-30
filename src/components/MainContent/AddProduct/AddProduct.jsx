/* Ten moduł odpowiada za dwa ekrany główne - Dodaj Produkt i Dodaj Przepis. 
    Przełączany zmienną IsInRecipeMode
*/

import React from 'react';
import ProductForm from "./ProductForm";
import RecipeForm from '../AddRecipe/RecipeForm';
import "./AddProduct.css";

import UserProducts_PrimeTable from './UserProducts_PrimeTable';
import PublicProducts_PrimeTable from './PublicProducts_PrimeTable';
import TableContainer from '../../common/TableContainer';

import Flex from '@react-css/flex';
import { API_URLs, fetchAPI } from '../../../API_Handler';

import log from '../../../Logger';

import {UserContext} from '../../../context/UserContext'; 


const AddProduct = ({IsInRecipeMode})=>{

    // States for User Table
    const [UserTableData, setUserTableData] = React.useState( []);

    //States for Public Table
    const [PublicTableData, setPublicTableData] = React.useState( []);

    //States for GUI display ,not used yet
    const [AreTablesExtended,setAreTablesExtended] = React.useState(true); 

    // States to handle Product form
    const [EditRowData, setEditRowData] = React. useState({});
    const [IsProductFormInEditMode,setIsProductFormInEditMode] = React. useState(false);
    const [IsMinimised,setIsMinimised] = React. useState(false);

    // States to handle Recipe form
    const [AddProductRow,setAddProductRow] = React.useState({});

    // To re-fetch userdata when logged in
    const { G_IsUserLoggedIn} = React.useContext(UserContext);
    
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
    React.useEffect(()=>{
        _updateUserProducts();
        _updatePublicProducts();  
    },[G_IsUserLoggedIn])

    /// Product Form Functions
    function onClickEdit(rowData){
        setEditRowData(rowData);
        setIsProductFormInEditMode(true);
        log.debug("Editing product", rowData);
    }

    // Recipe Form Functions

    function onClickAddToRecipe(rowData){
        setAddProductRow(rowData);
    }

    ///////////////////////////////////
    // API Functions

    //////////////////////
    // Product API
    //////////////////////

    // Delete product from user database
    function onClickDelete(rowData){
        fetchAPI(API_URLs.product.remove ,rowData)
        .then( data => {
            if (data.status === 1){
                // reset form on success
                log.info(`Product ${rowData.name} was deleted !`);
                _updateUserProducts();
            } 
            else {
                log.error(data.msg);
            } 
        })
    }

    // Add product to user data base
    function onProductFormSubmit(event,formData){
        event.preventDefault();
        log.debug("Submiting",IsProductFormInEditMode,formData);
        
        const url = IsProductFormInEditMode?
            API_URLs.product.update
            :API_URLs.product.add;

        fetchAPI(url,formData)
        .then( data => {
            if (data.status === 1){
                // reset form on success
                setEditRowData({});
                setIsProductFormInEditMode(false);
                _updateUserProducts();
            } 
            else {
                log.error(data.msg);
            } 
        });

    }
    //////////////////////
    // Recipe API
    //////////////////////
    function onRecipeFormSubmit(rowsData,title,description,photoURL){
        const obj = {
            name: title,
            description: description,
            photo: photoURL,
            productsList: rowsData.map((rowData)=>({
                product: rowData._id ,
                portion: rowData.portion
            }))
        }
        log.info(obj);

        fetchAPI(API_URLs.recipe.add,obj)
        .then( data => {
            if (data.status === 1){
                // reset form on success
                
            } 
            else {
                log.error(data.msg);
            }
             
        });
    }

    ////////////////////////

    

    



    return (
        <Flex className="AddProduct" flexDirection="row"  justifySpaceAround>
            <Flex.Item flex={1} className="AddProduct--form-container" alignSelf="flex-start">
                {IsInRecipeMode?
                    <RecipeForm {...{AddProductRow,onRecipeFormSubmit}} />
                    :<ProductForm {...{IsProductFormInEditMode,IsMinimised,EditRowData,onProductFormSubmit}}/>
                }
                 
            </Flex.Item >
            <Flex.Item flex={1}>
                <Flex  className="AddProduct--tables-container" column>

                    <TableContainer className="AddProduct--MyProductsTable-container" 
                    title="Moje produkty:"
                    NestedTable={
                        <UserProducts_PrimeTable TableData={UserTableData} defaultRows={5}
                        onClickEdit={onClickEdit} onClickDelete={onClickDelete}
                        IsInRecipeMode={IsInRecipeMode} onClickAddToRecipe={onClickAddToRecipe}
                        />}
                    />

                    <TableContainer className="AddProduct--PublicProductsTable-container" 
                    title="Publiczne produkty:"
                    NestedTable={
                        <PublicProducts_PrimeTable TableData={PublicTableData} defaultRows={10}
                        IsInRecipeMode={IsInRecipeMode} onClickAddToRecipe={onClickAddToRecipe}
                        />
                        }
                    />                  
                </Flex>

            </Flex.Item>
           
            
        </Flex>
    );
}

export default AddProduct;