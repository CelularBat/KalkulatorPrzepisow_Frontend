import { useState } from 'react'

import Flex from '@react-css/flex';

import Navbar from './components/navbar/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer/Footer';

import {GlobalContextProvider} from './context/GlobalContext';
import ShowMessage from './components/Global/ShowMessage';


function App() {
  const [activePageIdx, setActivePageIdx] = useState(0);
  
  const changeActivePage = (key)=>{
    setActivePageIdx(key)
  }

  // widgets that are not statis part of the page body
  const globalWidgets = (
    <>
      <ShowMessage />
    </>
  );
  return (
  <GlobalContextProvider>

    {globalWidgets}

     <Flex flexDirection="column">
        
        <Flex.Item>
          <Navbar activePageIdx={activePageIdx} cbPageChoice={changeActivePage}/> 
        </Flex.Item>
        <Flex.Item>
          <MainContent activePageIdx={activePageIdx}/>
        </Flex.Item>
        <Flex.Item>
           <Footer />
        </Flex.Item>
       
      </Flex>
  </GlobalContextProvider>
  )
}

export default App
