// Depreciated, not used 
// AddProduct/AddProduct.jsx handles both pages

import React from 'react';

import TableContainer from '../../common/TableContainer';
import Recipes_PrimeTable from './Recipes_PrimeTable';

import Flex from '@react-css/flex';
import { API_URLs, fetchAPI } from '../../../API_Handler';

const AddRecipe = () => {
    //States for User Table
    const [UserTableData, setUserTableData] = React.useState([]);

    //States for Public Table
    const [PublicTableData, setPublicTableData] = React.useState([]);

    React.useEffect(()=>{
        fetchAPI(API_URLs.recipes.getUserRecipes)
        .then( data => {
            setUserTableData(data);  
        });

        fetchAPI(API_URLs.recipes.getPublicRecipes)
        .then( data => {
            setPublicTableData(data);  
        });
    },[])

    return (
        <Flex className="AddProduct" flexDirection="row"  justifySpaceAround>
        <Flex.Item className="AddProduct--form-container" alignSelf="flex-start">
             <ProductForm2 {...{IsInEditMode,IsMinimised,EditRowData,onFormSubmit}}/>
        </Flex.Item >
        <Flex.Item flex={1}>
            <Flex  className="AddProduct--tables-container" column>
                
                <TableContainer className="AddProduct--MyProductsTable-container" 
                title="Moje produkty:"
                NestedTable={
                    <Recipes_PrimeTable TableData={UserTableData} defaultRows={5}
                    onClickEdit={onClickEdit} onClickDelete={onClickDelete}
                    />}
                />

                <TableContainer className="AddProduct--PublicProductsTable-container" 
                title="Publiczne produkty:"
                NestedTable={
                    <Recipes_PrimeTable TableData={PublicTableData} defaultRows={10}/>
                    }
                />
                    
               
                
            </Flex>

        </Flex.Item>
       
        
    </Flex>
    );
};

export default AddRecipe;