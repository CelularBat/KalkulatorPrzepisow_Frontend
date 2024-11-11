import React from "react";
import "./AddPhotoUrl.css"
import IMG_trashbin from "../../assets/trashbin.svg"

const AddPhotoURL = ({PhotoURL,handleAddPhoto})=>{
    const [IsAddFormOn,setIsAddFormOn] = React.useState(false);
    const [IsDeleteFormOn,setIsDeleteFormOn] = React.useState(false);


    function handleSpawnDeleteForm(){
        setIsDeleteFormOn(true);
    }
    function handleForm(formResult,url){
        switch (formResult){
            case "add": handleAddPhoto(url);
            break;
            case "cancel": //nothing
            break;
            case "remove": handleAddPhoto("");
            break;
        }

        setIsAddFormOn(false);
        setIsDeleteFormOn(false);
    }

    return(
        <div className='AddPhotoURL'>
            {   
                PhotoURL?
                <PreviewContainer {...{PhotoURL,handleSpawnDeleteForm}}/>
                :<button type="button" onClick={ ()=>setIsAddFormOn(true) }>Dodaj Zdjęcie!</button>    
            }
              
            {IsAddFormOn && <AddPhotoURLForm {...{handleForm}}/>}
            {IsDeleteFormOn && <AskDeletePhotoForm {...{handleForm}} />}
        </div>
    );
}
export default AddPhotoURL;

// Component AddPhotoURLForm
////////////////////////////
const AddPhotoURLForm = ({handleForm})=>{
    const [IsPhotoLoaded,setIsPhotoLoaded] = React.useState(false);
    const [PhotoURL,setPhotoURL] = React.useState("");

    async function verifyIfImg(url) {
        return fetch(url, {method: 'HEAD'})
        .then( (res) => {
          return res.headers.get('Content-Type').startsWith('image');
        })
        .catch( err=> {console.error(err) });
        
    }

    async function loadImg(){
        const isOk = await verifyIfImg(PhotoURL);
        if (isOk) {
            setIsPhotoLoaded(true);
        } else{
            console.log(isOk)
        }
    }

    return (
        <div className="overlay">
            <div className="AddPhotoURLForm" >
                { IsPhotoLoaded &&
                <div className="img-container">
                    <img src={PhotoURL}></img>
                </div>
                }
                <div className="url-box">
                { !IsPhotoLoaded?
                    <>
                        <button type="button" onClick={loadImg}>Prześlij</button>
                        <input type="text" placeholder="Wprowadź Url zdjęcia" 
                        onChange={(e)=>{ setPhotoURL(e.target.value)}}/>
                    </>
                    :<>
                    <button className="btn-add" type="button" 
                    onClick={()=>{handleForm("add",PhotoURL)}}>Dodaj</button>
                    </>
                }   
                <button className="btn-cancel" type="button" 
                onClick={()=>{handleForm("cancel")}}>Anuluj</button>  
                </div>
            </div>
        </div>
    )
}
// Component AskDeletePhotoForm
//////////////////////////////
const AskDeletePhotoForm = ({handleForm})=>{
    return (
        <div className="overlay">
        <div className="AddPhotoURLForm" >
            <div className="url-box">
              <button className="btn-cancel" type="button" 
              onClick={()=>{handleForm("remove")}}>Usuń zdjęcie</button>  
                <span>Czy na pewno usunąć zdjęcie?</span>
              <button className="btn-add" type="button" 
                onClick={()=>{handleForm("cancel")}}>Anuluj</button>
            </div>
        </div>
    </div>
    );
}


// Component PreviewContainer
////////////////////////////
const PreviewContainer = ({PhotoURL,handleSpawnDeleteForm})=>{
    return(
        <div className="preview-container">
            <button className="btn-delete" onClick={handleSpawnDeleteForm}> 
                <img src={IMG_trashbin} />
            </button>

            <img className="preview-img"src={PhotoURL}></img>
         </div>
    );
}