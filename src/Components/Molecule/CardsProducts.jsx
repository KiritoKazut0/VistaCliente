import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { RiArrowDropDownLine, RiEditLine } from "react-icons/ri";
import styled from 'styled-components'; // Importa styled-components
import ContainerIcon from '../Atoms/Button';

import SendProductContext from '../../Context/SendDateContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Delete from '@mui/icons-material/Delete';

function CardProducts({ name, brand, src, description, id }) {
    const [isStackVisible, setStackVisibility] = useState(false);
    const DateProduct = useContext(SendProductContext);
    const navigate = useNavigate();

    const toggleStackVisibility = () => {
        setStackVisibility(!isStackVisible);
    };

    useEffect(() => {}, [DateProduct]);

    // funcion eliminar
    const handlerDeleted = async () => {
        try {
            const requestOptions = { method: 'DELETE' };

            const response = await fetch(`http://localhost:8080/api/producto/${id}`, requestOptions);
            
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            alert("Producto eliminado");

        } catch (error) {
            alert("Se ha producido un error");
        }
    }




    const handlerEditar = () => {
        DateProduct.setNombre(name);
        DateProduct.setMarca(brand);
        DateProduct.setDescripcion(description);
        DateProduct.setImg(src);
        DateProduct.setId(id);
        navigate('/Upload-Products');
    }



    return (
        <CardStyled sx={{
            boxShadow: "0px 0px 5px 1px",

        }}>
            <CardMedia component="img" height="250" image={src} />
            <CardContent >
                <Typography variant="h6" component="div" sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {name}
                </Typography>
                <Typography variant="h8" component="div" sx={{ textAlign: "center" }}>
                    {brand}
                </Typography>
                <br />

                <ContainerIcon dropdown onClick={toggleStackVisibility}>
                    <Dropdawn />
                </ContainerIcon>
                {isStackVisible && (
                    <StackContainer>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handlerDeleted} >
                            Eliminar
                        </Button>
                        <Button variant="outlined" endIcon={<RiEditLine />} onClick={handlerEditar}>
                            Editar
                        </Button>
                    </StackContainer>
                )}
            </CardContent>
        </CardStyled>
    );
}

const CardStyled = styled(Card)`
    width: 100%;
    max-width: 300px; 
    margin: 15px;
    

    @media only screen and (min-width: 768px) {
        max-width: 400px;
        
    }

    @media only screen and (min-width: 1200px) {
        max-width: 300px;
        height: 60vh;
    }
    
`;

const StackContainer = styled.div`
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 767px) {
        flex-direction: column; 
        align-items: center;
    }

`;

const Dropdawn = styled(RiArrowDropDownLine)`
    font-size: 34px;
`;

export default CardProducts;
