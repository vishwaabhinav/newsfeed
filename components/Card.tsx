import styled from 'styled-components'

const Card = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  background: ${props => props.className === "user" ? "#e0e0e0" : "white"}
`

export default Card

export const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

export const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

export const SecondaryAvatar = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

export const SecondaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;  
`

export const SecondaryColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

export const SecondaryColumnRight = styled.div`
  flex-basis: ${props => props.className === "right-align" ? "1rem" : "3rem"};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => props.className === "right-align" ? "flex-end" : "flex-start"};
`
