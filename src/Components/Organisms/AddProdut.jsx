import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import InfoAddProduct from "../../Database/InfoAddProd";
import Container from '../Atoms/Container';
import Field from '../Molecule/Field';
import ImageWithCaption from '../Molecule/ImageWithCaption';
import Form from "../Atoms/Form";
import Display from "../Atoms/Display";
import Card from "../Atoms/Card";
import Back from "../Molecule/Back";
import React,{useState} from "react";

//--------------------------------------
import { useContext } from "react";
import userContext from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

function AddProduct() {

    const [selectedImage, setSelectedImage] = useState("https://i.imgur.com/zlZRPCT.jpg");
    const [MessageError, setMessageError] = useState({
        show: "none",
        messageError: "Error: Asegúrate de que has subido un archivo de imagen válido."
    });
    
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            // Verificar que el archivo es una imagen antes de actualizar el estado
            setMessageError ({
                show: "none",
                messageError: "Error: Asegúrate de que has subido un archivo de imagen válido."
            });
            setSelectedImage(URL.createObjectURL(selectedFile));
        } else {
            // Mostrar un mensaje de error o realizar otras acciones si el archivo no es una imagen
                setMessageError ({
                    show: "",
                    messageError: "Error: Asegúrate de que has subido un archivo de imagen válido."
                });
        }
    };
    


    return (
        <>
          <Card>
        <Back></Back>
          <Form primary enctype="multipart/form-data">

                <Container primary>

                    <Title primary tercery> {InfoAddProduct.RegisterProduct.title} </Title>
                    <Title secundary> {InfoAddProduct.nameEmpress}</Title>
                    <Display secundary>

                        {
                            InfoAddProduct.fields.map((date, index) => (
                                <Field key={index} name={date.name} type={date.type} 
                                        primary={date.primary}
                                        secundary={date.secundary} />
                            ))
                        }

                    </Display>
                    <Button primary> {InfoAddProduct.RegisterProduct.addButton}</Button>
                </Container>
                
                <ImageWithCaption src={selectedImage}
                    active={InfoAddProduct.upload.displayInput}
                    desactive={InfoAddProduct.upload.displayDescription}
                    type={InfoAddProduct.upload.type}
                    onChange={handleImageChange}
                    show={MessageError.show}
                    messageError={MessageError.messageError}
                    >
                    
                </ImageWithCaption>

               
            </Form>

          </Card>
        </>
    );
}





export default AddProduct;