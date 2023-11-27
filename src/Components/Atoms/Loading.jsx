import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";


function Loading() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(235, 220, 220, 0.7)'
        }}>
            <CircularProgress size={50}  /> 
                <Message>  Estamos preparando su nuevo producto, espere un momento</Message>
        </Box>
    );
}

const Message = styled.p`
        font-family:  cursive;
        font-size: 20px;
        top: 60%;
        position: absolute;
`;

export default Loading;