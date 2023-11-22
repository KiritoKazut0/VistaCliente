import styled from 'styled-components';
import Items from './Items';

const List = styled.ul`
    width: 100%;
    list-style: none;
    height: 25%;
    margin-top: ${props => props.opcions? "": "10px"};
    padding: 0 15%;
    overflow: hidden;
    background: white;
    box-shadow: 0px 0px 10px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
 `;



export default List;