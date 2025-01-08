import React from 'react';
import './ProductForm.css';
import InputNumber from 'src/components/common/headless/InputNumber';


function ProductForm({IsProductFormInEditMode,EditRowData,onProductFormSubmit}) {

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
    let {value ,type,name, checked} = event.target;

    switch (type){
      // number is already validated
      case "text":// text validation here
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
    <ProductFormRender {...{FormData,handleChange,cleanForm,IsProductFormInEditMode,onProductFormSubmit}} />
  );
}
   

const ProductFormRender = ({FormData,handleChange,cleanForm,IsProductFormInEditMode,onProductFormSubmit})=>{
  return (
 
  <form className="ProductForm" method="post" action="" target="_blank" 
  onSubmit={(event)=>{onProductFormSubmit(event,FormData)}} >


    <label htmlFor="name">&nbsp;&nbsp;*Nazwa: &nbsp;
    <input type="text" name="name" id="name"  required  maxlength="30"
    onChange={handleChange} value={FormData.name}/>
    </label>  

    <label htmlFor="brand">Marka: &nbsp;
    <input type="text" name="brand" id="brand" maxlength="30"
    onChange={handleChange} value={FormData.brand }/>
    </label>

    <label htmlFor="category">Kategoria: &nbsp;
    <input type="text" name="category" id="category" maxlength="30" 
    onChange={handleChange} value={FormData.category }/>
    </label>

    <p><b>Wartość energetyczna:</b></p>  
     
    <label htmlFor="kj">*kj: &nbsp;
    <InputNumber name="kj" id="kj"  required min="0" max="9999" step="1"
    onChange={handleChange} value={FormData.kj } />
    </label>

    <label htmlFor="kcal">*kcal: &nbsp;
    <InputNumber name="kcal" id="kcal"  required min="0" max="9999" step="1"
    onChange={handleChange} value={FormData.kcal } />
    </label>

    <p><b>Wartość odżywcza w 100g/ml:</b></p> 

    <label htmlFor="fat">*Tłuszcze: &nbsp;
    <InputNumber name="fat" id="fat"  required step="0.1" min="0" max="100"
    onChange={handleChange} value={FormData.fat } />
    </label>

    <label htmlFor="carb">*Węglowodany: &nbsp;
    <InputNumber name="carb" id="carb"  required step="0.1" min="0" max="100"
    onChange={handleChange} value={FormData.carb } />
    </label>

    <label htmlFor="sugar">*w tym Cukry: &nbsp;
    <InputNumber name="sugar" id="sugar"  required step="0.1" min="0" max="100" 
    onChange={handleChange} value={FormData.sugar } />
    </label>

    <label htmlFor="protein">*Białko: &nbsp;
    <InputNumber name="protein" id="protein"  required step="0.1" min="0" max="100"
    onChange={handleChange} value={FormData.protein } />
    </label>

    <label htmlFor="salt">*Sól: &nbsp;
    <InputNumber name="salt" id="salt"  step="0.1" min="0" max="100" 
    onChange={handleChange} value={FormData.salt } />
    </label>

    <label htmlFor="fiber">Błonnik: &nbsp;
    <InputNumber name="fiber" id="fiber"  step="0.1" min="0" max="100" 
    onChange={handleChange} value={FormData.fiber } />
    </label>

    <label htmlFor="public">Dodaj jako publiczne?
    <input type="checkbox" name="public" id="public"
    onChange={handleChange} value={FormData.public} checked={FormData.public}/>     
    </label>

    <label htmlFor="link">Link do produktu: &nbsp;
    <input type="text"  name="link" id="link" onChange={handleChange}/>
    </label>
    
    <input type="submit" className="btn_form"     
    value={IsProductFormInEditMode ? "Potwierdź edycję" : "Dodaj"}
    /> 

    <button type="button" className="btn_form" id="btn_clear" onClick={cleanForm} >Wyczyść</button>
</form> 

);
}




export default ProductForm;



























