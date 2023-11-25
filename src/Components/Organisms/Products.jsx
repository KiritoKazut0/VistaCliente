import Container from "../Atoms/Container";
import Productos from "../../Database/Products";
import CardProducts from "../Molecule/CardsProducts";
import Title from "../Atoms/Title";
import styled from "styled-components";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Nav from "../Molecule/Nav";





function Products() {



    return (

                <>
                    <Title products> Productos Publicados</Title>
                    <Nav></Nav>
                    <Linea></Linea>
                    <Container products>
                        {Productos.map(date => (
                            <CardProducts
                                name={date.nombre}
                                brand={date.marca}
                                src={date.url}
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