import React from 'react';
import { createPortal } from 'react-dom'

import ShowMessage from './Widgets/ShowMessage.jsx';

const PageWidgets = () => { 
    return  createPortal(
        ( 
            <>
                <ShowMessage />
            </>
        )
        ,document.getElementById('portal-root')
    );    
};

export default PageWidgets;