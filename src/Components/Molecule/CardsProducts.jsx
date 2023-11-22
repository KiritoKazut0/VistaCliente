import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { RiArrowDropDownLine, RiEditLine } from "react-icons/ri";
import styled from 'styled-components'; // Importa styled-components
import ContainerIcon from '../Atoms/Button';
import { Link } from 'react-router-dom';

function CardProducts({ name, brand, src }) {
    const [isStackVisible, setStackVisibility] = useState(false);

    const toggleStackVisibility = () => {
        setStackVisibility(!isStackVisible);
    };

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
                <ContainerIcon dropdown onClick={toggleStackVisibility}>
                    <Dropdawn />
                </ContainerIcon>
                {isStackVisible && (
                    <StackContainer>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={""}>
                            Eliminar
                        </Button>
                        <Link to={"/Upload-Products"}>
                            <Button variant="outlined" endIcon={<RiEditLine />}>
                                Editar
                            </Button>
                        </Link>
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
        height: 58vh;
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
