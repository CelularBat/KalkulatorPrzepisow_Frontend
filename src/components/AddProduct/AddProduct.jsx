import React from 'react';
import ProductForm2 from "./ProductForm2";
import "./AddProduct.css";

import PrimeProductsTable from './PrimeProductsTable';

import Flex from '@react-css/flex';
import { API_URLs, fetchAPI } from '../../API_Handler';


const AddProduct = ()=>{
    const [UserTableData, setUserTableData] = React.useState([]);

    // States to handle Product form
    const [EditRowData, setEditRowData] = React. useState({});
    const [IsInEditMode,setIsInEditMode] = React. useState(false);
    const [IsMinimised,setIsMinimised] = React. useState(false);

    React.useEffect(()=>{
        fetchAPI(API_URLs.products.getUserProducts)
        .then( data => {
            setUserTableData(data);  
        });
    },[])

    function onClickEdit(rowData){
        console.log(rowData);
        setEditRowData(rowData);
        setIsInEditMode(true);
        
    }
    function onClickDelete(rowData){}


    return (
        <Flex className="AddProduct" flexDirection="row"  justifySpaceAround>
            <Flex.Item className="AddProduct--form-container" alignSelf="flex-start">
                 <ProductForm2 {...{IsInEditMode,IsMinimised,EditRowData}}/>
            </Flex.Item >
            <Flex.Item flex={1}>
                <Flex  className="AddProduct--tables-container" column>
                    <Flex.Item className="AddProduct--MyProductsTable-container">
                        <PrimeProductsTable TableData={UserTableData} onClickEdit={onClickEdit} 
                        onClickDelete={onClickDelete}/>
                    </Flex.Item>
                    <Flex.Item className="AddProduct--MyProductsTable-container"> 
                        <PrimeProductsTable TableData={UserTableData}/>
                    </Flex.Item>
                    
                </Flex>

            </Flex.Item>
           
            
        </Flex>
    );
}

export default AddProduct;