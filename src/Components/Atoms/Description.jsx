import styled from 'styled-components';

const Description = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  text-align: center;
  padding: 10px;
  margin: 0;
  font-size: 49px;
  font-family: 'Dancing Script', cursive;
  color: white;
  display: ${props => props.primary? "none": "block"};
`;

export default Description