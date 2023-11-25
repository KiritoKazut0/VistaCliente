import styled from 'styled-components';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
function Nav({ruta}) {
    return (
        <NavStyle>
            <Link to={ruta}>
            <IconBack />
            </Link>    
        </NavStyle>

    );
}

const NavStyle = styled.nav`
    width:10%;
    height: 95vh;
    text-align: center;
    margin-top: 5vh;
  
`;

const IconBack = styled(IoArrowBackSharp)`
    font-size: 35px;
    color: black;
`;



export default Nav;