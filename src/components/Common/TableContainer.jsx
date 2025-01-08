import React from 'react';
import './TableContainer.css'
import classNames from 'classnames';

const TableContainer = ({children,title}) => {
    const [Hidden,setHidden] = React.useState(false);
    const [FullView,setFullView] = React.useState(false);
    
    function handleClickHide(){
        setHidden(prev=>!prev);
    }
    function handleClickFullView(){
        setFullView(prev=>!prev);
    }
    
    return (
        <div className={classNames("TableContainer", {fullView: FullView})}>
            <div className="TableContainer--header">

                <button type="button" onClick={(handleClickHide)} >
                    {Hidden?"▼ Rozwiń":"▲ Zwiń"}
                </button>

                <h3 style={{
                    marginRight:'auto', marginLeft:"30px"
                }}>
                    {title}
                </h3>

                <button type="button" onClick={handleClickFullView} >
                    {FullView?"🗗 Maksymalizuj":"🗖 Powrót"}
                </button>
                
            </div>
            {!Hidden && children}
        </div>
    );
};

export default TableContainer;