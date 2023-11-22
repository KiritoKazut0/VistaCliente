import styled from 'styled-components';

const Title = styled.span `
    color:  black;
    font-size: ${props=>props.primary? "38px": props.secundary? "18px": props.products? "35px": ""};
    font-family: ${props=>props.primary? "Georgia": props.secundary? "'Dancing Script', cursive" : props.products? "'Dancing Script', cursive": ""};
    text-align: ${props=> props.secundary? "center": props.tercery? "center": props.products? "center": ""};
    display: block;
    margin-bottom: ${props=> props.secundary? "30px": props.products? "15px": "48px"} ;
    margin-top: ${props => props.secundary? "-20px":  props.tercery?  "40px": props.products? "20px": ""};



`;

export  default Title;