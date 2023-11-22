import styled from 'styled-components';


const Button = styled.button `
    width: ${props=> props.primary ? "80%": props.items? "auto":props.opcions?"": props.dropdown?"":"125px"};
    height: ${props=> props.primary ? "40px": props.items? "auto": props.opcions?"": props.dropdown?"": "40px"} ;
    text-align: center;
    font-size: ${props => props.dropdown?"13px": "12px"};
    color:  ${props=> props.items? "none": props.opcions? "": props.dropdown?"":"white" };
    background:  ${props=> props.items? "none": props.opcions? "": props.dropdown?"none": "black"};
    border: none;
    margin-left: ${props=> props.primary ? "50px": props.opcions? "": props.dropdown?"45%": "50px"} ;
    margin-top: ${props=> props.primary ? "20px": props.opcions? "": props.dropdown?"": "20px"};
    font-family: 'Droid Serif', sans-serif;
    cursor: pointer;
    display: ${props =>props.display? "none": "block"};
    position: ${props=> props.opcions ? "absolute":props.dropdown?"": ""};
    left: ${props => props.opcions? "90%":props.dropdown?"": ""};

    &:hover{
    background: ${props => props.deleted ? "#cdc9c9": ""};
}
    
`;

export default Button;
