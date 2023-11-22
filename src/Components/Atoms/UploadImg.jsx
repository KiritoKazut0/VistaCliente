import styled from "styled-components";


function UploadImg({ primary, placeholder, accept, type, onChange }) {
  return (
    <>
      <Label primary={primary}>
        Subir
        <StyleUploadImg 
          placeholder={placeholder}
          accept={accept}
          type={type}
          onChange={onChange}

        >

        </StyleUploadImg>
      </Label>



    </>
  );
}

const StyleUploadImg = styled.input`
 display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  text-align: center;
  padding: 10px;
  margin: 0;
  width: 40%;
  font-family: 'Dancing Script', cursive;
  color: white;
   display: none; 

`;


const Label = styled.label`
width: 130px;
  display: ${props=> props.primary ? "inline-block": "none"};
  text-transform: uppercase;
  color: white;
  background: #00000055;
  font-size: 14px;
  position: absolute;
  top: 74%;
  left: 55%;
  transform: translate(-50%, -50%); 
  text-align: center;
  padding: 10px;
  margin: 0;
 
  border: 1px solid white;
  
  &:hover{
    background: black;
    color: white;
    border: none;
  }

`;

export default UploadImg;