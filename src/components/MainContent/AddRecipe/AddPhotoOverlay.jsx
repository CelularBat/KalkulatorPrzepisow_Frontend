import React from "react";
import './AddPhotoUrlOverlay.css'

import log from "../../../Logger";
import { SetMsgContext } from "../../../context/GlobalContext";
import Button from "../../common/Button";
import { fetchAPI, API_URLs } from "../../../API_Handler";


// Component AddPhotoURLForm
////////////////////////////
const AddPhotoURLOverlay = ({handleForm})=>{
    const [IsPhotoLoaded,setIsPhotoLoaded] = React.useState(false);
    const [PhotoURL,setPhotoURL] = React.useState("");

    const {showMsg} = React.useContext(SetMsgContext);

    async function loadImg(){
        const req = await fetchAPI(API_URLs.helper.verifyimg,{img: PhotoURL});
        const isOk = req.status == 1 && req.result == true; 
      
        if (isOk) {
            setIsPhotoLoaded(true);
        } 
        else if (req.status == 1){
            log.info("Wrong image url");
            showMsg("Wrong image url",0);
        } else
        {
            showMsg(req.result,0); // error msg
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