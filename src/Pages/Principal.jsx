import Products from "../Components/Organisms/Products";

//--------------------------------------
import { useContext } from "react";
import userContext from "../Context/UserContext";
import { Navigate } from "react-router-dom";

function Principal (){

    const {Acceso} = useContext(userContext);

    return (
        <>

            {Acceso? (
                
                    <Products/>
            ):(
                <Navigate to={"/"} replace={true}/>
                
            )}

        </>
    );
}

export default Principal;