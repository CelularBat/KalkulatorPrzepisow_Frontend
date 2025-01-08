import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../../common/PrimeTable.css"


function PublicProducts_PrimeTable({TableData,defaultRows,
    IsInRecipeMode, onClickAddToRecipe}) {

    const dataLabels = IsInRecipeMode?{
        category: {label:"Kategoria" ,hasFilter:true},
        name: {label:"Nazwa" ,hasFilter:true},
        brand: {label:"Marka" ,hasFilter:true},
        author:{label:"Autor" ,hasFilter:true}
    }
    :{
        category: {label:"Kategoria" ,hasFilter:true},
        name: {label:"Nazwa" ,hasFilter:true},
        brand: {label:"Marka" ,hasFilter:true},
        kj:{label: "Kj" ,hasFilter:false},
        kcal: {label:"Kcal" ,hasFilter:false},
        fat:{label: "Tłu" ,hasFilter:false}, 
        carb: {label:"Węgl" ,hasFilter:false}, 
        sugar: {label:"Cukr" ,hasFilter:false},
        protein:{label: "Biał" ,hasFilter:false}, 
        fiber:{label: "Błon" ,hasFilter:false}, 
        salt: {label:"Sól" ,hasFilter:false},
        author:{label:"Autor" ,hasFilter:true}
    }


    const [filters, setFilters] = React.useState();

    
    const initColumns = Object.entries(dataLabels)
    .map(([dataKey,keys])=>{
       return <Column key={dataKey} field={dataKey} header={keys.label} sortable
       {...(keys.hasFilter && {filter: true, filterPlaceholder:"filtruj", 
        filterMatchMode:FilterMatchMode.CONTAINS, matchMode:"contains" })} 
       />
    })
    
    const actionRecipeColumnBody = (rowData,options)=>
        <AddToRecipeTemplate rowData={rowData}
        onClickAddToRecipe={onClickAddToRecipe}
        />

    return (
    <DataTable value={TableData} 
    stripedRows  size="small" showGridlines 
    paginator rows={defaultRows} rowsPerPageOptions={[5, 10, 25, 50]}
    filterDisplay="row" filters={filters}
    selectionMode="single"
    >   
        {IsInRecipeMode && <Column header="Dodaj" body={ actionRecipeColumnBody} />}
        {initColumns}
        
    </DataTable>
    );
}


const AddToRecipeTemplate = ({rowData,onClickAddToRecipe})=>{
    return(
        <div>
             <button className="UserTable--button addToRecipe-button" onClick={()=>onClickAddToRecipe(rowData)}>+</button>
        </div>
    )
}


export default PublicProducts_PrimeTable;