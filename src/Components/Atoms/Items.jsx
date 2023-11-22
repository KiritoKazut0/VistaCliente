import styled from 'styled-components';

const Items = styled.li`
    margin-top: ${props => props.edit ? "0px": "20px"};
    font-size: ${props=> props.edit? "12px": "18px"};
    width: 100%;
    height: ${props => props.edit?"40px": ""};
    text-align: center; 
    color: ${props => props.opcions ? "white": props.edit? "white": "black"};
    font-family: 'Droid Serif', sans-serif;
    background: ${props => props.edit?"black": ""}; 
    border: ${props => props.edit?"white": ""} ;
    &:hover{
      font-weight: bold;
    }
`;

export default Items;