import React, { useState, useEffect } from "react";
import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import InfoUploadProduct from "../../Database/InfoUploadProduct";
import Container from '../Atoms/Container';
import Field from '../Molecule/Field';
import ImageWithCaption from '../Molecule/ImageWithCaption';
import Form from "../Atoms/Form";
import Display from "../Atoms/Display";
import Card from "../Atoms/Card";
import Back from "../Molecule/Back";
import AlertError from "../Atoms/AlertError";
import Loading from "../Atoms/Loading";
// importamos el contexto y el navigate
import SendProductContext from "../../Context/SendDateContext";
import { useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Img from "../Atoms/Img";
import userContext from "../../Context/UserContext";

function UploadProduct() {
    const {Acceso} = useContext(userContext);
    const [MessageErrorImg, setMessageErrorImg] = useState({ message: "", show: "none" });
    const [MessageErrorCamp, setMessageErrorCamp] = useState("");
    const [ActiveAlert, setActiveAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const dateProduct = useContext(SendProductContext);
    const [ShowImg, setShowImg] = useState(dateProduct.Img);
    

    useEffect(() => { console.log(dateProduct.Img) }, [dateProduct.Img]);



    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setMessageErrorImg({ message: "", show: "none" });
            setShowImg(URL.createObjectURL(selectedFile));
            dateProduct.setImg(selectedFile);

        } else {
            setMessageErrorImg({ message: "Error: Asegúrate de que has subido un archivo de imagen válido.", show: "" });
        }
    };

    const sendValueInput = (fieldName) => {
        switch (fieldName) {
            case "Nombre": return dateProduct.Nombre;
            case "Marca": return dateProduct.Marca;
            case "Descripcion": return dateProduct.Descripcion;
            default: return null;
        }
    }

    const getChangeHandler = (fieldName) => {
        switch (fieldName) {
            case "Nombre": return (e) => { dateProduct.setNombre(e.target.value) };
            case "Marca": return (e) => { dateProduct.setMarca(e.target.value) };
            case "Descripcion": return (e) => { dateProduct.setDescripcion(e.target.value) };
            default: return null;
        }
    }

    const validarCampos = () => {
        console.log(dateProduct.Img);

        if (dateProduct.Nombre === "" || dateProduct.Marca === "" || dateProduct.Descripcion === "" || !dateProduct.Img) {

            setMessageErrorCamp("Error: Todos los campos son obligatorios. Asegúrate de rellenar los datos.");
            setActiveAlert(true);
            return true;
        } else {
            setMessageErrorCamp("");
            setActiveAlert(false);
            return false;
        }
    };

    const sendImgApi = async () => {
        console.log(dateProduct.Img);
        try {
            const formData = new FormData();
            formData.append("file", dateProduct.Img);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch('http://52.45.183.82:3000/upload/image', requestOptions);
            if (!response.ok) { throw new Error('Error en la solicitud') }

            const result = await response.json();
            console.log(`https://drive.google.com/uc??export=download&id=${result.data.id}`);

            return `https://drive.google.com/uc?export=download&id=${result.data.id}`;

        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    };


    const sendUpdateProduct = async (e) => {

        e.preventDefault();

        if (validarCampos()) {
            console.log("la funcion validar esta funcionando");
            return null;
        }

        setLoading(true);
    
        let linkImgDrive = ShowImg;

        if (dateProduct.Img !== ShowImg) {
          linkImgDrive = await sendImgApi();
          console.log("Ya se actualizó la imagen:", linkImgDrive);
        }


        try {
            const formData = new FormData();
            formData.append("nombre", dateProduct.Nombre);
            formData.append("marca", dateProduct.Marca);
            formData.append("descripcion", dateProduct.Descripcion);
            formData.append("url", linkImgDrive);

            const requestOptions = {
                method: 'PUT',
                body: formData
            };

            //  

            const response = await fetch(` http://52.45.183.82:3000/api/producto/${dateProduct.Id}`, requestOptions);
            if (!response.ok) { throw new Error('Error en la solicitud') }
            alert("producto actualizado");

        } catch (error) {
            alert("Se ha producido un error al agregar el producto. Inténtelo más tarde.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            { Acceso? (
                <>
                    <Card>
                <Back ruta={"/Principal"}> </Back>  
                <Form primary enctype="multipart/form-data" onSubmit={sendUpdateProduct}>
                    <Container primary>
                        <Title primary tercery> {InfoUploadProduct.UploadProduct.title} </Title>
                        <Title secundary> {InfoUploadProduct.nameEmpress}</Title>
                        <Display secundary>
                            {InfoUploadProduct.fields.map((date, index) => (
                                <Field
                                    key={index}
                                    name={date.name}
                                    type={date.type}
                                    primary={date.primary}
                                    secundary={date.secundary}
                                    value={sendValueInput(date.name)}
                                    onChange={getChangeHandler(date.name)}

                                />
                            ))}
                        </Display>
                        <Button type="submit" primary>

                            {InfoUploadProduct.UploadProduct.addButton}
                        </Button>
                        {ActiveAlert && <AlertError messageError={MessageErrorCamp}  password></AlertError>}
                    </Container>

                    <ImageWithCaption
                        src={ShowImg}
                        active={InfoUploadProduct.upload.displayInput}
                        desactive={InfoUploadProduct.upload.displayDescription}
                        type={InfoUploadProduct.upload.type}
                        onChange={handleImageChange}
                        messageError={MessageErrorImg.message}
                        show={MessageErrorImg.show}
                    ></ImageWithCaption>

                    {loading && (<Loading />)}
                </Form>
            </Card>
                </>
            ):(
                    <Navigate to={"/"}/>
            )
            
            }
        </>
    );

}





export default UploadProduct;