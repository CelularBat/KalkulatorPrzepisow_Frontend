import React from 'react';
import './ProductForm.css';


function ProductForm2({IsProductFormInEditMode,IsMinimised,EditRowData,onProductFormSubmit}) {

  const initialDataState = {
    name: "",
    brand: "",
    category: "",
    kj: "",
    kcal: "",
    fat: "",
    carb: "",
    sugar: "",
    protein: "",
    salt: "",
    fiber: "",
    public: true,
    link: ""
  };

  const [FormData, setFormData] = React.useState( initialDataState);

  React.useEffect(()=>{
    if (IsProductFormInEditMode && EditRowData ){
      setFormData(EditRowData);
    }
    else {
      setFormData(initialDataState);
    }
  },[IsProductFormInEditMode,EditRowData])




  function handleChange(event){
    let {name, type, value , checked} = event.target;
    switch (type){
      case "number":{
        value = Number(value.replace(/,/g, '.')
        .replace(/[^0-9.]/g, '')); // This should be unecessary, double fail safe

        if (isNaN(value) ) {
          return; 
        }    

        if ( ! Number.isInteger(value)){
          value =Number(value.toFixed(1));
        }      
      }
        
      break;
        // text validation here
      case "text":
        
      break;

      case "checkbox":
        value = checked;
      break;
    }
    
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }));  
  }

  function cleanForm(){
    setFormData(initialDataState);
  }


  
  return(
    <ProductFormRender2 {...{FormData,handleChange,cleanForm,IsProductFormInEditMode,onProductFormSubmit}} />
  );
}
   

const ProductFormRender2 = ({FormData,handleChange,cleanForm,IsProductFormInEditMode,onProductFormSubmit})=>{
  const ID = React.useId();

  // This function is needed for firefox, because this browser allows writing anything to input type="number"
  // and if it's an invalid number then DOM sends empty string
  function stopInvalidInput(event){

    const numberPattern = /^[0-9.,]+$/;
    if (! ( numberPattern.test(event.key) 
      || ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown', 'Tab'].includes(event.code)) ){
        event.preventDefault();
    }
  }

  return (
 
    
  <form className="form" method="post" action="" target="_blank" onSubmit={onProductFormSubmit} >
    <label htmlFor="name">
      <button type="button" className="btn_form" onClick={cleanForm} >Wyczyść</button>&nbsp;&nbsp;*Nazwa: &nbsp;
    </label>
    <input type="text" name="name" id="name"  required onChange={handleChange} value={FormData.name}/>

    <label htmlFor="brand">Marka: &nbsp;</label>
    <input type="text" name="brand" id="brand" 
    onChange={handleChange} value={FormData.brand }/>

    <label htmlFor="category">Kategoria: &nbsp;</label>
    <input type="text" name="category" id="category"  
    onChange={handleChange} value={FormData.category }/>

    <label htmlFor=""><b>Wartość</b></label> <label className="label-left"><b>&nbsp;energetyczna:</b></label>      
    <label htmlFor="kj">*kj: &nbsp;</label>
    <input type="number" name="kj" id="kj"  required 
    onChange={handleChange} value={FormData.kj } onKeyDown={stopInvalidInput}/>

    <label htmlFor="kcal">*kcal: &nbsp;</label>
    <input type="number" name="kcal" id="kcal"  required 
    onChange={handleChange} value={FormData.kcal } onKeyDown={stopInvalidInput}/>

    <label htmlFor=""><b>Wartość odżywcza</b></label> <label className="label-left"><b>&nbsp;w 100g/ml:</b></label>
    <label htmlFor="fat">*Tłuszcze: &nbsp;</label>
    <input type="number" name="fat" id="fat"  required step="0.1" min="0" max="5000"
    onChange={handleChange} value={FormData.fat } onKeyDown={stopInvalidInput}/>

    <label htmlFor="carb">*Węglowodany: &nbsp;</label>
    <input type="number" name="carb" id="carb"  required step="0.1" min="0" max="5000"
    onChange={handleChange} value={FormData.carb } onKeyDown={stopInvalidInput}/>

    <label htmlFor="sugar">*Cukry: &nbsp;</label>
    <input type="number" name="sugar" id="sugar"  required step="0.1" min="0" max="5000" 
    onChange={handleChange} value={FormData.sugar } onKeyDown={stopInvalidInput}/>

    <label htmlFor="protein">*Białko: &nbsp;</label>
    <input type="number" name="protein" id="protein"  required step="0.1" min="0" max="5000"
    onChange={handleChange} value={FormData.protein } onKeyDown={stopInvalidInput}/>

    <label htmlFor="salt">*Sól: &nbsp;</label>
    <input type="number" name="salt" id="salt"  step="0.1" min="0" max="5000" 
    onChange={handleChange} value={FormData.salt } onKeyDown={stopInvalidInput}/>

    <label htmlFor="fiber">Błonnik: &nbsp;</label>
    <input type="number" name="fiber" id="fiber"  step="0.1" min="0" max="5000" 
    onChange={handleChange} value={FormData.fiber } onKeyDown={stopInvalidInput}/>

    <label htmlFor="public">Dodaj jako publiczne?</label>
    <input type="checkbox" name="public" id="public"
    onChange={handleChange} value={FormData.public} checked={FormData.public}/>     

    <label htmlFor="link">Link do produktu: &nbsp;</label>
    <input type="text"  name="link" id="link" onChange={handleChange}/>
    
    <input type="submit" className="btn_form" 
    value={IsProductFormInEditMode ? "Potwierdź edycję" : "Dodaj"}
    onClick={(event)=>{onProductFormSubmit(event,FormData)}}
    />
    
  
    
    
    
</form> 

);
}




export default ProductForm2;



























