import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Components/Organisms/Login.jsx'
import Principal from './Pages/Principal.jsx'
import AddProduct from './Components/Organisms/AddProduct.jsx'
import UploadProduct from './Components/Organisms/UploadProduct.jsx'
// importacion de mi contexto 
import userContext from './Context/UserContext.js'
import SendProductContext from './Context/SendDateContext.js'
import ChangePassword from './Context/ChangePassword.js'

//-------------------------------------------


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,

  }, {
    path: "/Principal",
    element: <Principal />
  }, {
    path: "/Add-Productos",
    element: <AddProduct />
  }, , {
    path: "/Upload-Products",
    element: <UploadProduct />
  }
]);



function App() {
  const [Acceso, setAcceso] = useState(false);
  const [Nombre, setNombre] = useState ("");
  const [Marca, setMarca] = useState ("");
  const [Descripcion, setDescripcion] = useState("");
  const [Img, setImg] = useState ("");
  const [Id, setId] = useState(0);

  const [SavePassword, setSavePassword] = useState ("");
  const [NewPassword, setNewPassword] = useState ("");
  const [IdCliente, setIdCliente] = useState ("");
  
  return (
    <>

     <ChangePassword.Provider value={{NewPassword, setSavePassword,
                                      SavePassword, setNewPassword,
                                      IdCliente, setIdCliente,
                                      }}>

     <userContext.Provider value={{ Acceso, setAcceso }}>
        <SendProductContext.Provider value={{
              Nombre, setNombre,
              Marca, setMarca,
              Descripcion, setDescripcion,
              Img, setImg,
              Id, setId
        }} >
            <RouterProvider router={router} />
        </SendProductContext.Provider>
       </userContext.Provider>

     </ChangePassword.Provider>

    </>
  );
}

export default App;
