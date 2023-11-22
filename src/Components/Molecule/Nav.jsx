import styled from 'styled-components';
import List from '../Atoms/List';
import Items from '../Atoms/Items';
import Button from '../Atoms/Button';
import IconClose from '../Atoms/IconClose';
import IconMenu from '../Atoms/IconMenu';
import { useState } from 'react';
import OpcionsNav from '../../Database/ItemsNav';
import StyledLink from '../Atoms/Link';

function Nav() {
    const [ShowItems, setShowItems] = useState(false);

    const CloseElements = () => {
        setShowItems(true);
        console.log(ShowItems)
    }

    const OpenElements = () => {
        setShowItems(false);
        console.log(ShowItems)
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
                            <Items> {OpcionsNav.ChangePassword} </Items>
                            <Items> {OpcionsNav.SingOff} </Items>
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