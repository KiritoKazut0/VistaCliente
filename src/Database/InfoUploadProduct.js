const InfoUploadProduct = {
    UploadProduct: {
      title: "Modificacion de productos" ,
      addButton: "Actualizar",
    },
    nameEmpress: "Jotiquez" ,
    uploadImg :"Subir Imagen",
    
    fields: [
      {
        name: "Nombre",
        type: "text",
        primary: "true",
        secundary: ""
      },{
        name: "Marca",
        type: "text",
        primary: "true",
        secundary: ""
      },{
        name: "Descripcion",
        type: "text",
        primary: "",
        secundary: "true"
      }
    ],

    upload: {
        type:"file",
          name:"Subir" ,
          accept:"image/*",
          displayInput: "true",
          displayDescription: "true"
      }
    
  
  };

  export default InfoUploadProduct;