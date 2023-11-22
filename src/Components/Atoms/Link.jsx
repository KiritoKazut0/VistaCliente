import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledLink= styled(Link)`
list-style: none;
width: ${props => props.primary? "": "100px"}  ;
height: ${props => props.primary? "": "40px"};
text-decoration: none;
color:  black;
display: ${props => props.primary? "": "flex"};
justify-content:${props => props.primary? "": "center"};
align-items:${props => props.primary? "": "center"};
font-size: ${props => props.primary? "": "13px"};
font-family: ${props => props.primary ? "" :"'Droid Serif', sans-serif"};


&:hover{
    background: ${props=> props.primary ? "": "#cdc9c9"};
}
`;

export default StyledLink;