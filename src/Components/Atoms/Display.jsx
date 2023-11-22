import styled from "styled-components";
const Display = styled.div `
  display: ${props =>props.primary? "none": props.secundary? "flex":  "block"};
  justify-content: ${props => props.secundary? "center": ""};
  flex-wrap: wrap;
  width: 100%;

`;

export default Display;