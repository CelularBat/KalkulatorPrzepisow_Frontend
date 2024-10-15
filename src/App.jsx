import { useState } from 'react'
import './App.css'

import Flex from '@react-css/flex';

import Navbar from './components/navbar/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
  const [activePageIdx, setActivePageIdx] = useState(0);
  
  const changeActivePage = (key)=>{
    setActivePageIdx(key)
  }

  return (
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
  )
}

export default App
