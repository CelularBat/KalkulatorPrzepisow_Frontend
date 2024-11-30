import { useState } from 'react'

import Flex from '@react-css/flex';

import Navbar from './Navbar/Navbar';
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';



const Page = () => {
    const [activePageIdx, setActivePageIdx] = useState(0);
  
    const changeActivePage = (key)=>{
      setActivePageIdx(key)
    }

    return (
        <>
        <Flex flexDirection="column" style={{height:"100%"}}>
            <Flex.Item flex={1}>
                <Navbar {...{activePageIdx}} cbPageChoice={changeActivePage}/> 
            </Flex.Item>
            <Flex.Item flex={1}>
                <MainContent {...{activePageIdx}}/>
            </Flex.Item>
            <Flex.Item flex={1}>
                <Footer />
            </Flex.Item>
        
        </Flex>
        </>
    );
};

export default Page;