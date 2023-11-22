import React, { useState } from "react";
import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import Container from "../Atoms/Container";
import Field from "../Molecule/Field";
import ImageWithCaption from "../Molecule/ImageWithCaption";
import Form from "../Atoms/Form";
import InfoRegister from "../../Database/DateForms";
import AlertError from "../Atoms/AlertError";

import userContext from "../../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



function Login() {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Active, setActive] = useState(false);
    const [ActiveAlert, setActiveAlert] = useState({
        message: "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.",
        top: "75%",
        left: "10%",
        width: "33%",
        backgraund: "none",
        color: "red"
    });

// aqui hago una desustructuracion para poder manipuarlo en la funcion validar datos:
const {setAcceso} = useContext(userContext);
const navigate = useNavigate();

    const handlerUserName = (event) => {
        setUserName(event.target.value);
        console.log(event.target.value);
    };

    const handlerPassword = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    };

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

    const obtenerDatosCliente = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await fetch("http://localhost:8080/api/Cliente");
            const datos = await respuesta.json();
            console.log(datos);
            ValidarDatos(datos);
        } catch (error) {
            console.error("Error al obtener datos de la api", error);
        }
    };


    const ValidarDatos = (datos) => {

        if (datos[0].usuario === UserName && datos[0].contraseña === Password) {
            console.log("Es válido");
            setActive(false); //quito la alerta
            setAcceso(true);
           navigate("/Productos");

        } else {
            setActive(true);
            console.log("Inválido");

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
                            Active && <AlertError messageError={ActiveAlert.message}
                                                top={ActiveAlert.top}
                                                left={ActiveAlert.left}
                                                width={ActiveAlert.width}
                                                background={ActiveAlert.backgraund}
                                                color={ActiveAlert.color}
                            ></AlertError>
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
