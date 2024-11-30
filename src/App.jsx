

import {GlobalContextProvider} from './context/GlobalContext';
import { UserContextProvider } from './context/UserContext';

import Page from './components/Page';
import PageWidgets from './components/PageWidgets';



function App() {

  return (
    <GlobalContextProvider>
    <UserContextProvider >
      
      <Page />
      <PageWidgets />

    </UserContextProvider>
    </GlobalContextProvider>
  )
}

export default App
