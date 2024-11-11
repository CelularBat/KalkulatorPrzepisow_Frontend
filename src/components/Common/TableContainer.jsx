import React from 'react';

const TableContainer = ({NestedTable,title}) => {
    const [Hidden,setHidden] = React.useState(false);
    
    function handleClick(){
        setHidden(prev=>!prev);
    }
    return (
        <div>
            <div style={{
                display:"flex", flexDirection:"row", justifyContent:"space-between",
                marginBlock:"10px"
            }}>
                <button type="button" onClick={handleClick} style={{
                    width:'30%'
                }}>
                    {Hidden?"▼ Rozwiń":"▲ Zwiń"}</button>
                <h3 style={{
                    marginRight:'auto', marginLeft:"30px"
                }}>
                    {title}</h3>
                
            </div>
            {!Hidden && NestedTable}
        </div>
    );
};

export default TableContainer;