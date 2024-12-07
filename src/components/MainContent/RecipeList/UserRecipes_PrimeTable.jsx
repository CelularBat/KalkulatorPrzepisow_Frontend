import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../../common/PrimeTable.css"

import IMG_Padlock from "../../../assets/padlock.png";
import IMG_Public from "../../../assets/public.png";


function UserRecipes_PrimeTable({TableData,defaultRows,
    handleDeleteRecipe,handleEditRecipe
    }) {

    const dataLabels = {
        name: {label:"Nazwa" ,hasFilter:true},
        description: {label:"Opis" ,hasFilter:false},
        
        
    }

    const [filters, setFilters] = React.useState();
    
    //Main columns
    const initColumns = Object.entries(dataLabels)
    .map(([dataKey,keys])=>{
       return <Column key={dataKey} field={dataKey} header={keys.label} sortable
       {...(keys.hasFilter && {filter: true, filterPlaceholder:"filtruj", 
        filterMatchMode:FilterMatchMode.CONTAINS, matchMode:"contains" })} 
       />
    })
    
    //Action keys column
    const actionColumnBody = (rowData,options)=>
        <ActionKeysTemplate rowData={rowData}
        {...{handleDeleteRecipe,handleEditRecipe}}
        />
    
    const photoColumnBody = (rowData,options)=>
        <PhotoTemplate rowData={rowData}/>



    return (
    <DataTable value={TableData} 
    stripedRows  size="small" showGridlines 
    paginator rows={defaultRows} rowsPerPageOptions={[5, 10, 25, 50]}
    filterDisplay="row" filters={filters}
    selectionMode="single"
    >   
        <Column header="Zdjęcie" body={ photoColumnBody} />       
        {initColumns}
        <Column header="" body={ actionColumnBody} />
        
    </DataTable>
    );
}

const PhotoTemplate = ({rowData})=>{
    const photo= (rowData?.photos && rowData?.photos.length > 0) ? rowData.photos[0] : undefined ;

    return photo?(
        <div style={{width:"100%",height:"100%",overfloe:"hidden"}}>
            <img src={photo} style={{width:"100%",height:"auto",overfloe:"hidden"}}/>
        </div>      
    ) : null;
}

const ActionKeysTemplate = ({rowData,handleDeleteRecipe,handleEditRecipe})=>{
    return(
        <div style={{gap:"5px", display:"Flex", flexDirection:"column"}}>
            <button className="UserTable--button edit-button" onClick={()=>handleEditRecipe(rowData)}>✎</button>
            <button className="UserTable--button delete-button" onClick={()=>handleDeleteRecipe(rowData)}>X</button>
        </div>      
    )
}


export default UserRecipes_PrimeTable;