import styled from 'styled-components';
import List from '../Atoms/List';
import Items from '../Atoms/Items';
import Button from '../Atoms/Button';
import IconClose from '../Atoms/IconClose';
import IconMenu from '../Atoms/IconMenu';
import { useState} from 'react';
import OpcionsNav from '../../Database/ItemsNav';
import StyledLink from '../Atoms/Link';
//-----------------------------------------
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import userContext from '../../Context/UserContext';
import FormDialog from './Modals';


function Nav() {
    const [ShowItems, setShowItems] = useState(false);
    const Acceso = useContext(userContext);

    const CloseElements = () => { setShowItems(true)}
    const OpenElements = () => {setShowItems(false)}

    const SignOff = () => { 
        Acceso.setAcceso(false); 
        Navigate("/");
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
                            <FormDialog value={OpcionsNav.ChangePassword} ></FormDialog> 
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