import styled from "styled-components";
import Img from "../Atoms/Img";
import Description from "../Atoms/Description";
import UploadImg from "../Atoms/UploadImg";
import AlertError from "../Atoms/AlertError";


const ImageWithCaption = ({ src, alt, description, active, desactive, placeholder, accept, type, onChange, messageError, show }) => {
  return (
    <Figure>
      <imgContainer>
        <Img src={src} alt={alt} />
        <Description primary={desactive}>{description}</Description>
        <UploadImg primary={active}
          placeholder={placeholder}
          accept={accept}
          type={type}
          onChange={onChange}
        ></UploadImg>

      <AlertError show={show} messageError={messageError} ></AlertError>
      </imgContainer>
    

    </Figure>
  );
};



const Figure = styled.figure`
  width: 55%;
  height: 100%;
  position: relative; 
  overflow: hidden;
  
`;

const imgContainer = styled.div`
 position: relative;
  width: 0%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ImageWithCaption;

// position: absolute;
// top: 74%;
// left: 55%;
// transform: translate(-50%, -50%);
// text-align: center;
// padding: 10px;