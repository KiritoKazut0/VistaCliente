import styled from 'styled-components';

function Img ({src, alt, primary}){
    return (
        <>
            <StyleImg src={src} alt={alt} primary={primary}></StyleImg>
        </>
    );
}

const StyleImg = styled.img`
    width: ${props => props.primary ? "40px": "100%"};
    height: ${props =>props.primary ? "40px": "100%"};
    object-fit:cover;
    margin-left: 10px;
`;

export default Img;