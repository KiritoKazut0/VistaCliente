import styled from "styled-components";

function Input({ placeholder, type, name, accept, primary, onChange }) {
    return (
        <div>
            <StyleInput placeholder={placeholder}
                type={type}
                name={name}
                accept={accept}
                primary={primary}
                onChange={onChange}
            ></StyleInput>
        </div>

    );
}

const StyleInput = styled.input`
  width: ${props => props.primary ? "100%" : "80%"} ;
  font-size: 14px;
  padding: ${props => props.primary ? "30px 0px" : "20px 12px"};
  margin: ${props => props.primary ? "0px 80px 30px 0px" : "0px 12px 28px 12px"};
  border: none; 
  outline: none;
  border-bottom: 1px solid #868686;
  font-family: 'Droid Serif', sans-serif;

  &:focus {
    outline: none; 
    border-bottom: 2px solid black ;

  }

  `;

export default Input;