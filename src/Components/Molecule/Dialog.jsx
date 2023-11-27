import React from "react";
import styled from 'styled-components';
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";

function Dialog({Password, newPassword, type, onchage}) {
    return (
        <>
            <StyledDialog>
                <Input type={typee}></Input>
                <Input></Input>
            </StyledDialog>
        </>
    );
}


const StyledDialog = styled.div`
     width: 45%;
    height: 35%;
    background: ${props => props.primary ? "" : " #ffff"};
    position: ${props => props.primary ? "absolute" : "relative"};
    overflow: hidden;
    border: none;
    display: ${props => props.primary ? "" : "flex"};
    justify-content: space-around;
    align-items: center;

`;

export default Dialog (); 