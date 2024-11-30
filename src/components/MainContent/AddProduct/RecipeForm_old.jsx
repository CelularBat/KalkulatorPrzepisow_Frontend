import React, { useEffect } from 'react';

const RecipeForm_old = ({AddProductRow}) => {

    return (
        <div className='RecipeForm'>
            <RecipeTable {... {AddProductRow}}/>
        </div>
    );
};

const RecipeTable = ({AddProductRow})=>{
    const [RowsData,setRowsData] = React.useState([]);

    React.useEffect(()=>{
        setRowsData( (prev) =>{
            let newArr = [...prev];
            newArr.push(
                {...AddProductRow, 
                portion: 0}
            )
            return newArr;
        });         

    },[AddProductRow])

    const tableBody = RowsData.map((e)=>{
        return (
            <tr>
                <th>{e.name}</th>
                <th>{e.brand}</th>
                <th><input placeholder='porcja'></input></th>

            </tr>
        )
    });

    return(
        <table className="table">
        <thead>
            <tr>           
                <th>Nazwa</th>
                <th>Marka</th>
                <th>Porcja [g/ml]</th>
                
                <th></th>
            </tr>
        </thead>
        <tbody>
            {tableBody}
        </tbody>
        <tfoot>
            <tr>          
                <th>Nazwa</th>
                <th>Marka</th>
                <th>Porcja [g/ml]</th>
                
                <th></th>
            </tr>
        </tfoot>
    </table>

    );
}
export default RecipeForm_old;