import styled from 'styled-components';
import List from '../Atoms/List';
import Items from '../Atoms/Items';
import Button from '../Atoms/Button';
import IconClose from '../Atoms/IconClose';
import IconMenu from '../Atoms/IconMenu';
import { useState } from 'react';
import OpcionsNav from '../../Database/ItemsNav';
import StyledLink from '../Atoms/Link';
//-----------------------------------------
import userContext from '../../Context/UserContext';
import ChangePassword from '../../Context/ChangePassword';
import { useContext } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

function Nav() {
    const [ShowItems, setShowItems] = useState(false);
    const Acceso = useContext(userContext);


    // console.log ('password: ', Password.NewPassword);

    const CloseElements = () => { setShowItems(true)}
    const OpenElements = () => {setShowItems(false)}

    const SignOff = () => { 
        Acceso.setAcceso(false); 
        Navigate("/");
    }

    const ChangePassword = ()=>{
        //aqui llegara los nuevos valores del formulario 
        try {
            const formData = new FormData();
            formData.append("id", Password.IdCliente);
            formData.append("contraseña", Password.NewPassword);
    

            const requestOptions = {
                method: 'PUT',
                body: formData
            };


            const response = fetch(` http://localhost:8080/api/producto/${Password.id}`, requestOptions);
            if (!response.ok) { throw new Error('Error en la solicitud') }
            alert("producto actualizado");

        } catch (error) { 
            alert("Se ha producido un error al agregar el producto. Inténtelo más tarde.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <NavStyle>
            <Button onClick={ShowItems ? OpenElements : CloseElements} items >
                {ShowItems ? <IconClose fontSize={30} /> : <IconMenu fontSize={30} />}
            </Button>
            {
                ShowItems && (
                    <List>
                            <StyledLink to={"/Add-Productos"} primary> <Items> {OpcionsNav.Add} </Items> </StyledLink>
                            <Button singOf onClick={ChangePassword} > <Items> {OpcionsNav.ChangePassword} </Items> </Button>
                           <Button singOf onClick={SignOff} >  <Items> {OpcionsNav.SingOff} </Items> </Button>
                    </List>
                )
            }

        </NavStyle>

    );
}

const NavStyle = styled.nav`
    width:10%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: end;
    position: absolute;
    left: 88%;
    top: 10px;
`;



export default Nav;