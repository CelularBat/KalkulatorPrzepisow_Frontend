import React from 'react';
import Recipes_PrimeTable from './Recipes_PrimeTable';
import AddPhotoURL from './AddPhotoUrl';
import "./RecipeForm.css"

import RecipeSumTable from '../../../common/RecipeSumTable';


import {delayFunction} from '../../../../Utils';
import log from '../../../../Logger';
import { EditRecipeContext } from '../../../../context/EditRecipeContext';
import AskPopUp from '../../../common/lib/AskPopUp';





const RecipeForm = ({AddProductRow,onRecipeFormSubmit,onRecipeFormUpdate}) => {

    const [RowsData,setRowsData] = React.useState([]);
    const [PhotoURL,setPhotoURL] = React.useState("");
    const [Title,setTitle] = React.useState("");
    const [Description,setDescription] = React.useState("");

    const [IsDataLoaded,setIsDataLoaded] = React.useState(false);

    const {G_IsFormRecipeInEditMode,setG_IsFormRecipeInEditMode,G_EditRecipeData} = React.useContext(EditRecipeContext);

    const [ShowPopUpClean,setShowPopUpClean] = React.useState(false);
    // On edit save recipe to local storage
    React.useEffect(()=>{
        if (RowsData.length > 0) {
            delayFunction.delay("localStorage",()=>{ //to not spam local storage
                localStorage.setItem('tempRecipe', JSON.stringify(RowsData));
                localStorage.setItem('tempRecipeInfo', JSON.stringify({
                    title: Title,
                    description: Description,
                    photoURL: PhotoURL
                }),3000);
            })     
        }  
    },[RowsData,PhotoURL,Title,Description]);

    
    // On init load recipe from local storage 
    // OR load recipe to edit if button "edit recipe" was clicked on recipe list
    React.useEffect(()=>{
        if (G_IsFormRecipeInEditMode && G_EditRecipeData){
            setRowsData(G_EditRecipeData.productsList);
            setTitle(G_EditRecipeData.name);
            setDescription(G_EditRecipeData.description);
            if (G_EditRecipeData.photos.length > 0){
                setPhotoURL(G_EditRecipeData.photos[0]);
            }
        } 
        else{
            const tempCopy = localStorage.getItem('tempRecipe');
            const tempCopyInfo = JSON.parse(localStorage.getItem('tempRecipeInfo'));
            if (tempCopy !== null){
                setRowsData(JSON.parse(tempCopy));
                setTitle(tempCopyInfo.title);
                setDescription(tempCopyInfo.description);
                setPhotoURL(tempCopyInfo.photoURL);
            }
        }
        setIsDataLoaded(true);
    },[]);

    React.useEffect(()=>{
        // check if product isn't already in the array
        if (IsDataLoaded && AddProductRow._id && !RowsData.find(e=>e._id === AddProductRow._id) ){ 
            log.debug("Adding row",AddProductRow);
           
            setRowsData( (prev) =>{
                let newArr = [...prev];
                newArr.push(
                    {...AddProductRow, 
                    portion: 0}
                )
                return newArr;
            });   
        }    
    },[AddProductRow])


    

   

    function handleDeleteRow(rowData){
        setRowsData((prev)=>prev.filter((e)=>{
            return e._id !== rowData._id;
        }));
    }

    function handlePortionChange(rowData,value){
        let restrictedValue = Math.max( Math.min(value , 9999) , 0);
        setRowsData((prev)=>{
            return prev.map( (e)=> 
                (e._id == rowData._id) ? {...e, portion:restrictedValue } :e 
            );
        });
    }

    function handleAddPhoto(url){
            setPhotoURL(url);  
    }

    function onRecipeCancelEdit(){
        setG_IsFormRecipeInEditMode(false);
    }

    function onCleanForm(answer){
        if (answer){
            setRowsData([]);
            setTitle("");
            setDescription("");
            setPhotoURL("");
        }
        setShowPopUpClean(false);
    }

    return (
        
        <div className='RecipeForm'>
            <div className='RecipeForm--Title' style={{display:"grid", placeItems:"center"}}>
                <h2>Skomponuj własny przepis!</h2>
            </div>
            <div className='title-container'>
                        <label className='title-label' htmlFor="title">Tytuł </label>
                        <input type="text" name="title" value={Title} 
                        onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='info-container'>
                 <AddPhotoURL {...{PhotoURL,handleAddPhoto}}/>
                 
                 <div className='description-container'>
                    <label className='description-label' htmlFor="Opis">Opis</label>
                    <textarea name="Opis" value={Description} 
                    onChange={(e)=>setDescription(e.target.value) }
                    />
                 </div>
                 
            </div>

            <Recipes_PrimeTable {... {RowsData,handleDeleteRow,handlePortionChange}}/>

            <div className='btn-recipe-container'>
            {G_IsFormRecipeInEditMode?
                <>
                    <button className='btn-recipe'
                    onClick={()=>onRecipeFormUpdate(G_EditRecipeData._id, RowsData,Title,Description,PhotoURL)}>
                        Aktualizuj przepis
                    </button>
 
                    <button className='btn-recipe btn-cancel'
                    onClick={onRecipeCancelEdit}>
                        Anuluj
                    </button>   
                </>                   
            :
                <button className='btn-recipe'
                onClick={()=>onRecipeFormSubmit(RowsData,Title,Description,PhotoURL)}>
                    Dodaj przepis!
                </button>
            }
            </div>
   

            

            <RecipeSumTable {...{RowsData}}/>

            <button className='btn-recipe btn-cancel'
                onClick={()=>setShowPopUpClean(true)}>
                    Wyczyść wszystko!
            </button>
            <AskPopUp callBack={onCleanForm} isShown={ShowPopUpClean}
             question="Wyczyścić wszystko?" />


            
        </div>
    );
};


export default RecipeForm;
