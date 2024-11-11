import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import IMG_Padlock from "../../assets/padlock.png";

const Recipes_PrimeTable = ({RowsData,handleDeleteRow,handlePortionChange})=>{

    const dataLabels = {
        name: {label:"Nazwa" },
        brand: {label:"Marka" },
        portion: {label: "Porcja"}
    }

    return(
        <DataTable value={RowsData} draggable="false"
        stripedRows  size="small" showGridlines 
        paginator rows={20} rowsPerPageOptions={[5, 10, 20, 30, 50]}
        selectionMode="single"
        >   
            <Column key={"public"} header={""} style={{width:"4%", padding: "0 2px 0 2px"}}  body={ (rowData)=>
                !rowData.public ?
                 <img src={IMG_Padlock} style={{maxWidth:"100%" ,margin:0}}/>
                 :<div></div>
            } />

           <Column key={"name"} field={"name"} header={dataLabels.name.label} sortable body={
            (rowData)=>
            <span>
                
                {rowData.name}
            </span>
           }/>

           <Column key={"brand"} field={"brand"} header={dataLabels.brand.label} sortable />

           <Column key={"portion"} field={"portion"} header={dataLabels.portion.label} sortable 
           style={{width:"10%"}}
            body={(rowData)=>
                <input className="RecipeForm--input" type="number" max="9999" min="0" step="0.1"
                style={{
                    width:"100%", color:'red'
                }}
                value={rowData.portion} onChange={(event)=>{
                    handlePortionChange(rowData,event.target.value);
                }}>
                </input>
            }/>

            <Column header="" style={{width:"10%"}} 
            body={
                (rowData)=><ActionsKeysTemplate {... {rowData,handleDeleteRow}}/> 
            }/>
        </DataTable>   

    );
}



const ActionsKeysTemplate = ({rowData,handleDeleteRow})=>{
    return(
        <div style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
            <button className="RecipeForm--button delete-button" 
            style={{maxHeight:"2vh", display:"grid", alignContent:"center", color:"red" 
                ,backgroundColor:"bisque"
            }}
            onClick={()=>handleDeleteRow(rowData)}>
            X</button>
        </div>
    );
}
export default Recipes_PrimeTable;