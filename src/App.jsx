import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Components/Organisms/Login.jsx'
import AddProduct from './Components/Organisms/AddProdut.jsx'
import UploadProduct from './Components/Organisms/UploadProduct.jsx'

// importacion de mi contexto 
import userContext from './Context/UserContext.js'
//-------------------------------------------


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './Components/Organisms/Products.jsx'

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login/>,
 
  }, {
    path: "/Productos",
    element: <Products/>
  },{
    path: "/Add-Productos",
    element: <AddProduct/>
  },,{
    path: "/Upload-Products",
    element: <UploadProduct/>
  }
]);



function App() {
  const [Acceso, setAcceso] = useState(false)
  return (
    <>
      <userContext.Provider value={{Acceso, setAcceso}}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </>
  );
}

export default App;
