import React, { useEffect, useState } from "react";
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

function AddProduct() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [DateName, setDateName] = useState("");
  const [DateMarca, setDateMarca] = useState("");
  const [DateDescripcion, setDateDescripcion] = useState("");
  const [MessageErrorImg, setMessageErrorImg] = useState({
    message: "",
    show: "none",
  });
  const [MessageErrorCamp, setMessageErrorCamp] = useState("");
  const [ActiveAlert, setActiveAlert] = useState(false);
  const [ImgShow, setImgShow] = useState("https://i.imgur.com/zlZRPCT.jpg");
  const [webLink, setWebLink] = useState(null);

  useEffect(() => {
    console.log("webLink actualizado:", webLink);
  }, [webLink]); 

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setMessageErrorImg({ message: "", show: "none" });
      setImgShow(URL.createObjectURL(selectedFile));
      setSelectedImage(selectedFile);
    } else {
      setMessageErrorImg({
        message: "Error: Asegúrate de que has subido un archivo de imagen válido.",
        show: "",
      });
    }
  };

  const getChangeHandler = (fieldName) => (event) => {
    switch (fieldName) {
      case "Nombre":
        setDateName(event.target.value);
        break;
      case "Marca":
        setDateMarca(event.target.value);
        break;
      case "Descripcion":
        setDateDescripcion(event.target.value);
        break;
      default:
        break;
    }
  };

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

  const uploadFileToApi = async () => {
    try {
      if (!selectedImage) {
        console.log("Por favor, selecciona un archivo antes de intentar subirlo");
        return null;
      }
  
      const formData = new FormData();
      formData.append("file", selectedImage);
  
      const response = await fetch("http://localhost:8080/upload/image", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error al subir el archivo. Código de estado: ${response.status}`);
      }
  
      const responseData = await response.json();
      const LinkImG = responseData.data.webViewLink;
      console.log("Nuevo enlace:", LinkImG);
      return LinkImG;
    } catch (error) {
      console.error("Error:", error);
      alert("Se ha producido un error al subir el archivo a la API en drive");
      return null;
    }
  };
  
  const addProductoToApi = async (event) => {
    event.preventDefault();
  
    try {
      if (validarCampos()) {
        console.log("funciona la validación");
        return;
      }
  
      const linkFromUpload = await uploadFileToApi();
  
      if (linkFromUpload !== null) {
        console.log("el nuevo link:", linkFromUpload);
  
        const formData = new FormData();
        formData.append("nombre", DateName);
        formData.append("marca", DateMarca);
        formData.append("descripcion", DateDescripcion);
        formData.append("url", linkFromUpload);
  
        const response = await fetch("http://localhost:8080/api/producto", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Error al agregar el producto. Código de estado: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log(responseData);
        alert("Producto agregado con éxito");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Se ha producido un error al agregar el producto");
    }
  };

  return (
    <>
      <Card>
        <Back></Back>
        <Form primary onSubmit={addProductoToApi} enctype="multipart/form-data">
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
              {" "}
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
        </Form>
      </Card>
    </>
  );
}

export default AddProduct;
