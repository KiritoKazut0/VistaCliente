import Container from "../Atoms/Container";
import CardProducts from "../Molecule/CardsProducts";
import Title from "../Atoms/Title";
import styled from "styled-components";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Nav from "../Molecule/Nav";
import { useState, useEffect } from "react";




function Products() {
    const [DataProduct, setDataProduct] = useState([]);

    //conectamos la api 
    useEffect(() => {
        fetch('http://52.45.183.82:3000/api/producto')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`La solicitud falló con el código ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setDataProduct(data);
                //  console.log(data);
                // console.log(DataProduct)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });
    }, [DataProduct]);


    

    return (

        <>
            <Title products> Productos Publicados</Title>
            <Nav></Nav>
            <Linea></Linea>
            <Container products>
                {DataProduct.map((date, index) => (
                    <CardProducts
                        key={index}
                        name={date.nombre}
                        brand={date.marca}
                        description={date.descripcion}
                        src={date.url}
                        id={date.id}
                    
                    ></CardProducts>
                ))}
            </Container>

        </>
    );
}


const Linea = styled.div`
    border-top: 5px solid black;
    margin-bottom: 50px;
`;



export default Products;