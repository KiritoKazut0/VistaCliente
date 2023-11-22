import React from 'react';
import styled from 'styled-components';



const Form = styled.form `
    width: ${props => props.primary? "90%" : "100%"} ;
    height:  ${props => props.primary? "100vh" : "100vh"};
    background: #FFFF;
    display: flex;
    justify-content: center;
    align-items: center;



`;

export default Form;