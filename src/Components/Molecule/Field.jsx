import Input from "../Atoms/Input";
import styled from 'styled-components';


function Field({ type, name, accept, primary, secundary, onChange, onblur, value }) {
    return (
        <>
  
            <Label primary={primary} secundary= {secundary} > {name}
            <Input type={type} name={name} accept={accept}  primary ={primary} 
                    onChange={onChange} onblur={onblur} value={value}  ></Input>

             </Label>
           
        </>
    );
}



const Label = styled.label`
    
    font-size: 12px;
    font-family: 'Droid Serif', sans-serif;
    cursor: pointer;
    width: ${props => props.primary ? "40%": "100%"};
    margin-left: ${props => props.primary ? "20px": props.secundary? "45px": ""};
`;








export default Field;