import React from "react";
import './AddPhotoUrlOverlay.css'

import log from "../../../Logger";
import { SetMsgContext } from "../../../context/GlobalContext";
import Button from "../../common/Button";


// Component AddPhotoURLForm
////////////////////////////
const AddPhotoURLOverlay = ({handleForm})=>{
    const [IsPhotoLoaded,setIsPhotoLoaded] = React.useState(false);
    const [PhotoURL,setPhotoURL] = React.useState("");

    const {showMsg} = React.useContext(SetMsgContext);

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
        } 
        else{
            log.info("Wrong image url");
            showMsg("Wrong image url",0);
        }
    }

    return (
        <div className="overlay">
            <div className="AddPhotoURLOverlay" >
                { IsPhotoLoaded &&
                <div className="img-container">
                    <img src={PhotoURL}></img>
                </div>
                } 
                <div className="url-box">
                { !IsPhotoLoaded?
                    <>
                        
                        <Button type="ok" onClick={loadImg}>Prześlij</Button>
                        <input type="text" placeholder="Wprowadź Url zdjęcia" 
                        onChange={(e)=>{ setPhotoURL(e.target.value)}}/>
                    </>
                    :<>
                    <Button type="ok"
                    onClick={()=>{handleForm("add",PhotoURL)}}>Dodaj</Button>
                    </>
                }   
                <Button type="cancel" 
                onClick={()=>{handleForm("cancel")}}>Anuluj</Button>  
                </div>
            </div>
        </div>
    )
}

export default AddPhotoURLOverlay;