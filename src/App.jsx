

import {GlobalContextProvider} from './context/GlobalContext';
import { UserContextProvider } from './context/UserContext';
import { EditRecipeContextProvider } from './context/EditRecipeContext';

import Page from './components/Page';
import PageWidgets from './components/PageWidgets';



function App() {

  return (
    <GlobalContextProvider>
    <UserContextProvider >
    <EditRecipeContextProvider>
      
      <Page />
      <PageWidgets />

    </EditRecipeContextProvider>
    </UserContextProvider>
    </GlobalContextProvider>
  )
}

export default App
