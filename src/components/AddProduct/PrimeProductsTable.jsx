import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./PrimeProductsTable.css"


function PrimeProductsTable({TableData,onClickEdit,onClickDelete}) {
    const dataLabels = {
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
        public: {label:"Pub" ,hasFilter:false} 
    };

    let filters = {};
    const builtFiltersOptions = Object.entries(dataLabels).forEach(([dataKey,keys])=>{
       if ( keys.hasFilter ) {
            filters[dataKey] = { value: null, matchMode: FilterMatchMode.CONTAINS };
       }
    });

    
    const initColumns = Object.entries(dataLabels).map(([dataKey,keys])=>{
       return <Column key={dataKey} field={dataKey} header={keys.label} sortable
       {...(keys.hasFilter && {filter: true, filterPlaceholder:"filtruj", 
        filterMatchMode:FilterMatchMode.CONTAINS, matchMode:"contains" })} 
        
       />
    })
    
    return (
    <DataTable value={TableData} 
    stripedRows  size="small" showGridlines 
    paginator rows={2} rowsPerPageOptions={[2,5, 10, 25, 50]}
    filterDisplay="row" filters={filters}
    selectionMode="single"
    >
        <Column header="" body={(rowData,options)=>
            <ActionKeysTemplate rowData={rowData}
            onClickEdit={onClickEdit} onClickDelete={onClickDelete}
            />} 
        />
        {initColumns}
    </DataTable>
    );
}



const ActionKeysTemplate = ({rowData,onClickEdit,onClickDelete})=>{
    return(
        <>
            <button onClick={()=>onClickEdit(rowData)}>✎</button>
            <button onClick={()=>onClickDelete(rowData)}>X</button>
        </>
        
    )
}

export default PrimeProductsTable;