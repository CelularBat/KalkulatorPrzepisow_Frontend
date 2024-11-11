/* Ten moduł odpowiada za dwa ekrany główne - Dodaj Produkt i Dodaj Przepis. 
    Przełączany zmienną IsInRecipeMode
*/

import React from 'react';
import ProductForm from "./ProductForm";
import RecipeForm from '../AddRecipe/RecipeForm';
import "./AddProduct.css";

import UserProducts_PrimeTable from './UserProducts_PrimeTable';
import PublicProducts_PrimeTable from './PublicProducts_PrimeTable';
import TableContainer from '../Common/TableContainer';

import MessageBox from '../Common/MessageBox';

import Flex from '@react-css/flex';
import { API_URLs, fetchAPI } from '../../API_Handler';

import log from '../../Logger';


const AddProduct = ({IsInRecipeMode})=>{
    // States for User Table
    const [UserTableData, setUserTableData] = React.useState([]);

    //States for Public Table
    const [PublicTableData, setPublicTableData] = React.useState([]);

    //States for GUI display
    const [AreTablesExtended,setAreTablesExtended] = React.useState(true);

    // States to handle Product form
    const [EditRowData, setEditRowData] = React. useState({});
    const [IsProductFormInEditMode,setIsProductFormInEditMode] = React. useState(false);
    const [IsMinimised,setIsMinimised] = React. useState(false);

    // States to handle Recipe form
    const [AddProductRow,setAddProductRow] = React.useState({});


    React.useEffect(()=>{
        fetchAPI(API_URLs.products.getUserProducts)
        .then( data => {
            setUserTableData(data);  
        });

        fetchAPI(API_URLs.products.getPublicProducts)
        .then( data => {
            setPublicTableData(data);  
        });
    },[])

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
            log.info(data);  
        });
    }


    // API Functions

    // Delete product from user database
    function onClickDelete(rowData){
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
            log.info(data);  
        });

    }



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