import React, { useState } from "react";
import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import InfoAddProduct from "../../Database/InfoAddProd";
import Container from "../Atoms/Container";
import Field from "../Molecule/Field";
import ImageWithCaption from "../Molecule/ImageWithCaption";
import Form from "../Atoms/Form";
import Display from "../Atoms/Display";
import Card from "../Atoms/Card";
import Back from "../Molecule/Back";
import AlertError from "../Atoms/AlertError";
import Loading from "../Atoms/Loading";

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../../Context/UserContext";

function AddProduct() {
  const {Acceso} = useContext(userContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [DateName, setDateName] = useState("");
  const [DateMarca, setDateMarca] = useState("");
  const [DateDescripcion, setDateDescripcion] = useState("");
  const [MessageErrorImg, setMessageErrorImg] = useState({ message: "", show: "none" });
  const [MessageErrorCamp, setMessageErrorCamp] = useState("");
  const [ActiveAlert, setActiveAlert] = useState(false);
  const [ImgShow, setImgShow] = useState("https://i.imgur.com/zlZRPCT.jpg");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setMessageErrorImg({ message: "", show: "none" });
      setImgShow(URL.createObjectURL(selectedFile));
      setSelectedImage(selectedFile);
    } else {
      setMessageErrorImg({ message: "Error: Asegúrate de que has subido un archivo de imagen válido.", show: "" });
    }
  };

  const getChangeHandler = (fieldName) => {
    switch (fieldName) {
      case "Nombre": return (e) => { setDateName(e.target.value) };
      case "Marca": return (e) => { setDateMarca(e.target.value) };
      case "Descripcion": return (e) => { setDateDescripcion(e.target.value) };
      default: return null;
    }
  }

  const validarCampos = () => {
    if (DateName === "" || DateMarca === "" || DateDescripcion === "" || !selectedImage) {
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
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch('http://localhost:8080/upload/image', requestOptions);
      if (!response.ok) { throw new Error('Error en la solicitud') }

      const result = await response.json();
      console.log(`https:://drive.google.com/uc??export=download&id=${result.data.id}`);

      return `https://drive.google.com/uc??export=download&id=${result.data.id}`;

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      return null;
    }
  };

  const sendNewProduct = async (e) => {
    e.preventDefault();
    if (validarCampos()) {
      console.log("la funcion validar está funcionando");
      return null;
    }

    setLoading(true);

    const linkImgDrive = await sendImgApi();
    console.log("ya se actualizó la imagen: ", linkImgDrive);

    try {
      const formData = new FormData();
      formData.append("nombre", DateName);
      formData.append("marca", DateMarca);
      formData.append("descripcion", DateDescripcion);
      formData.append("url", linkImgDrive);

      const requestOptions = {
        method: 'POST',
        body: formData
      };

      const response = await fetch('http://localhost:8080/api/producto', requestOptions);
      if (!response.ok) { throw new Error('Error en la solicitud') }
      alert("producto agregado");

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
        <Back ruta={"/Principal"} ></Back>
        <Form primary onSubmit={sendNewProduct} enctype="multipart/form-data">
          <Container primary>
            <Title primary tercery> {InfoAddProduct.RegisterProduct.title} </Title>
            <Title secundary> {InfoAddProduct.nameEmpress}</Title>
            <Display secundary>
              {InfoAddProduct.fields.map((date, index) => (
                <Field
                  key={index}
                  name={date.name}
                  type={date.type}
                  primary={date.primary}
                  secundary={date.secundary}
                  onChange={getChangeHandler(date.name)}
                />
              ))}
            </Display>
            <Button type="submit" primary>

              {InfoAddProduct.RegisterProduct.addButton}
            </Button>
            {ActiveAlert && <AlertError messageError={MessageErrorCamp} addProduct></AlertError>}
          </Container>

          <ImageWithCaption
            src={ImgShow}
            active={InfoAddProduct.upload.displayInput}
            desactive={InfoAddProduct.upload.displayDescription}
            type={InfoAddProduct.upload.type}
            onChange={handleImageChange}
            messageError={MessageErrorImg.message}
            show={MessageErrorImg.show}
          ></ImageWithCaption>

          {loading && (<Loading/> )}
        </Form>
      </Card>
            </>
        ):(
          <Navigate to={"/"}></Navigate>
        )

        }
     </>
  );
}

export default AddProduct;
