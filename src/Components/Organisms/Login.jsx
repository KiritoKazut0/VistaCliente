import React, { useState, useEffect } from "react";
import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import Container from "../Atoms/Container";
import Field from "../Molecule/Field";
import ImageWithCaption from "../Molecule/ImageWithCaption";
import Form from "../Atoms/Form";
import InfoRegister from "../../Database/DateForms";
import AlertError from "../Atoms/AlertError";
//-------------------------------------
import userContext from "../../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../Context/ChangePassword";


function Login() {
    // uso del contexto 
    const {Acceso} = useContext(userContext);
    const SavePassword = useContext (ChangePassword);

    // estados: 
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Active, setActive] = useState(false);

    //este estado me sirve para estar activando y desactivando las alertas de acuerdo a las validaciones
    const [MesasageError, setMesasageError] = useState("");


//este hook me sirve para establecerle un valor  a acceso, que lo usare para mandarlo a la pagina princiopal o no
// que en este caso seria la de productos (home)
const {setAcceso} = useContext(userContext);

//navigate me sirve para redireccionar al usario una vez que el acceso haya sido verdadero
const navigate = useNavigate();

useEffect(() => { console.log(SavePassword.NewPassword) }, [ SavePassword.NewPassword ]);

    //este hook me sirve para que mi estado se este actualizando cada vez que se este presionando una tecla
    const handlerUserName = (event) => {
        setUserName(event.target.value);
    };
    // y lo mismo pasa para password
    const handlerPassword = (event) => {
        setPassword(event.target.value);
    };

    //este me sirve para idefinciar, que funcion mandarle a mi input, si es la de password o la de user y asi verficar las 
    //actualizaciones de cada estado: password y user
    const getChangeHandler = (fieldName) => {
        switch (fieldName) {
            case "Usuario":
                return handlerUserName;
            case "Contraseña":
                return handlerPassword;
            default:
                return () => { }; 
        }
    };


    //realizar la peticion:
   const obtenerDatosCliente = (event)=>{
    event.preventDefault(); 

    fetch("http://localhost:8080/api/Cliente")
    .then(response => {
        if (!response.ok) {
            throw new Error (`Error de red -Código: ${response.status}`);
        }
        return response.json();
    })
    .then(data=> {
        console.log(data);
      ValidarDatos(data);

    })
    .catch(error =>{
        console.log ('Error en la solicitud: ',error);
    })

   } 

    const ValidarDatos = (data) => {
        // recibe como parametro el json que es datos. hace las validaciones y si todo es correcto entonces se activa el estado Active
        // y uso el navigate para mandarlo a la pagina principal que es la de productos 
        if (UserName === "" && Password ===""){
            setMesasageError("Error, asegurate de que hayas rellenado los campos correctamente");
            setActive(true);
            

        } else if (data[0].usuario === UserName && data[0].contraseña === Password) {
           SavePassword.setNewPassword(data[0].contraseña);
           SavePassword.setIDCliente = (data [0].id);
    
            console.log("Es válido");
            setActive(false); //quito la alerta
            setAcceso(true); 
            navigate("/Principal");

        } else {
            setMesasageError("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
            setActive(true);    // este es el estado de la alerta
    

        };

    };

    return (
        <>
            <Form onSubmit={obtenerDatosCliente}>
                <Container>
                    <Title primary> {InfoRegister.Login.title} </Title>
                    {InfoRegister.fields.map((date, index) => (
                        <Field
                            key={index}
                            name={date.name}
                            type={date.type}
                            onChange={getChangeHandler(date.name)}
                        />
                    ))}
                    <Button type="submit">{InfoRegister.Login.login}</Button>
                        {
                            Active && <AlertError messageError={MesasageError} primary></AlertError>
                        }
                </Container>
                <ImageWithCaption
                    src={InfoRegister.imgFond}
                    description={InfoRegister.description}
                    show={"none"}
                />
            </Form>
        </>
    );
}

export default Login;
