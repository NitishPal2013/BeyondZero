import { createContext, useState } from "react"
import CreateUser from "./pages/CreateUser"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Base from "./pages/Base"
import Home from "./pages/Home"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/base',
    element: <Base/>  },

])


export const UsernameContext = createContext<string>('');

function App() {

  const [username, setUsername] = useState<string>('');

  if(username){
    return (
      <UsernameContext.Provider value={username}>
        <RouterProvider  router={router}/>       
      </UsernameContext.Provider>
    )
  }

  else{
    return(
      <>
      <CreateUser setUsername = {setUsername}/>
      </>
    )
  }

}

export default App
