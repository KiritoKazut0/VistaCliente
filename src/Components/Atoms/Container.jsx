import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.primary ? "40%" : props.products ? "90%":  "30%"};
  height: ${props => props.primary ? "80vh" : props.products ? "100vh":  "80vh"};
  padding: ${props => props.primary ? "8% 5% 5% 0%" :props.products ? "0px 5%":  "20vh 5% 0 15%"};
  display: ${props => props.products ? "flex": ""} ;
  flex-wrap: ${props => props.products ? "wrap": ""} ;
  justify-content:  ${props => props.products ? "space-around": ""} ;
  
`;

export default Container;